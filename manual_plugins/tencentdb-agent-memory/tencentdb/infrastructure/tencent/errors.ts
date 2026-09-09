const PERMANENT_HTTP_STATUSES =
  new Set([
    400,
    401,
    403,
    404,
    409,
    413,
    422,
  ])

const RETRYABLE_HTTP_STATUSES =
  new Set([
    408,
    425,
    429,
  ])

export class HttpStatusError
extends Error {
  readonly status: number

  constructor(
    status: number,
    path: string,
    detail: string,
  ) {
    super(
      `HTTP ${status} ${path}: ${detail}`,
    )
    this.name = "HttpStatusError"
    this.status = status
  }
}

export class TransportError
extends Error {
  readonly cause: unknown

  constructor(cause: unknown) {
    super(String(cause))
    this.name = "TransportError"
    this.cause = cause
  }
}

export function httpStatusFrom(
  error: unknown,
): number | null {
  if (
    !error ||
    typeof error !== "object" ||
    (error as any).name !==
      "HttpStatusError" ||
    !Number.isInteger(
      (error as any).status,
    )
  ) {
    return null
  }

  return (error as any).status
}

export function isPermanentHttpError(
  error: unknown,
): boolean {
  const status =
    httpStatusFrom(error)

  return Boolean(
    status !== null &&
    PERMANENT_HTTP_STATUSES.has(
      status,
    ),
  )
}

export function isRetryableError(
  error: unknown,
): boolean {
  if (
    error &&
    typeof error === "object" &&
    (error as any).name ===
      "TransportError"
  ) {
    return true
  }

  const status =
    httpStatusFrom(error)

  return Boolean(
    status !== null &&
    (
      RETRYABLE_HTTP_STATUSES.has(
        status,
      ) ||
      status >= 500
    ),
  )
}
