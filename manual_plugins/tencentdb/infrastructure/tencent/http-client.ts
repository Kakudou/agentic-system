import type {
  ApiEnvelope,
} from "../../domain/model.ts"

import {
  CircuitBreaker,
} from "./circuit-breaker.ts"

type HeadersFactory =
  (
    path: string,
    body: unknown,
  ) => Record<string, string>

export class HttpJsonClient {
  readonly breaker: CircuitBreaker

  private baseURL: string
  private timeoutMs: number
  private headersFactory:
    HeadersFactory

  constructor(
    baseURL: string,
    timeoutMs: number,
    threshold: number,
    openMs: number,
    headersFactory:
      HeadersFactory,
  ) {
    this.baseURL = baseURL
    this.timeoutMs = timeoutMs
    this.headersFactory =
      headersFactory

    this.breaker =
      new CircuitBreaker(
        threshold,
        openMs,
      )
  }

  async request<T = unknown>(
    path: string,
    options?: {
      method?: string
      body?: unknown
      timeoutMs?: number
    },
  ): Promise<T> {
    this.breaker
      .assertAvailable()

    const method =
      options?.method ??
      "POST"

    const body =
      options?.body

    const headers = {
      Accept:
        "application/json",

      "Content-Type":
        "application/json",

      ...this.headersFactory(
        path,
        body,
      ),
    }

    const init:
      RequestInit = {
        method,
        headers,
        signal:
          AbortSignal.timeout(
            options?.timeoutMs ??
            this.timeoutMs,
          ),
      }

    if (
      body !== undefined &&
      method !== "GET"
    ) {
      init.body =
        JSON.stringify(body)
    }

    try {
      const response =
        await fetch(
          `${this.baseURL}${path}`,
          init,
        )

      const text =
        await response.text()

      let parsed:
        any = text

      try {
        parsed =
          text
            ? JSON.parse(text)
            : null
      } catch {
        // Keep plain text.
      }

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} ${path}: ${text}`,
        )
      }

      if (
        parsed &&
        typeof parsed === "object" &&
        typeof parsed.code === "number"
      ) {
        const envelope =
          parsed as ApiEnvelope<T>

        if (
          envelope.code !== 0
        ) {
          throw new Error(
            `TencentDB business error ${envelope.code} ${path}: ${envelope.message}`,
          )
        }

        this.breaker.success()

        return envelope.data
      }

      this.breaker.success()

      return parsed as T
    } catch (error) {
      this.breaker.failure()
      throw error
    }
  }
}
