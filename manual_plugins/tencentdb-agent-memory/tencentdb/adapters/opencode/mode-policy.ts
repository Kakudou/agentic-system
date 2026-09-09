import type {
  ModeEffectPolicy,
} from "../../domain/ports.ts"

const PLUGIN_ID =
  "kakudou.tencentdb-memory"

const MODE_BRIDGE =
  Symbol.for(
    "kakudou.mode-router.v2.bridge",
  )

export const MODE_POLICY_DENIAL =
  "tencentdb-memory: disabled by authoritative mode-router policy"

type ModeBridge = {
  resolveRequest?: (
    event: any,
  ) => any
  pluginDecisionFor?: (
    sessionID: string,
    pluginID: string,
  ) => Promise<any>
}

function bridge():
  ModeBridge | null {
  const value =
    (globalThis as any)[MODE_BRIDGE]

  return (
    value &&
    typeof value === "object"
  )
    ? value as ModeBridge
    : null
}

function explicitSessionID(
  event: any,
): string | null {
  const candidate =
    event?.sessionID ??
    event?.sessionId ??
    event?.session?.id ??
    event?.context?.sessionID ??
    event?.context?.sessionId ??
    null

  return (
    typeof candidate === "string" &&
    candidate.trim()
  )
    ? candidate.trim()
    : null
}

export class ModePolicyGate
implements ModeEffectPolicy {
  private readonly setupSuppressed =
    new Map<
      string,
      Set<string>
    >()

  sessionID(
    event: any,
  ): string | null {
    const runtimeBridge = bridge()

    if (
      typeof runtimeBridge
        ?.resolveRequest ===
        "function"
    ) {
      try {
        const resolved =
          runtimeBridge
            .resolveRequest(event)
        const sessionID =
          explicitSessionID(
            resolved,
          )

        if (sessionID) {
          return sessionID
        }
      } catch {
        return null
      }
    }

    return explicitSessionID(event)
  }

  async isEnabled(
    sessionID: string | null,
  ): Promise<boolean> {
    if (!sessionID) {
      return false
    }

    const runtimeBridge = bridge()
    if (
      typeof runtimeBridge
        ?.pluginDecisionFor !==
        "function"
    ) {
      return false
    }

    try {
      const decision =
        await runtimeBridge
          .pluginDecisionFor(
            sessionID,
            PLUGIN_ID,
          )

      return (
        decision?.managed === true &&
        decision?.enabled === true &&
        typeof decision?.mode ===
          "string" &&
        Boolean(
          decision.mode.trim(),
        )
      )
    } catch {
      return false
    }
  }

  async requireEnabled(
    sessionID: string | null,
  ): Promise<void> {
    if (
      !await this.isEnabled(
        sessionID,
      )
    ) {
      throw new Error(
        MODE_POLICY_DENIAL,
      )
    }
  }

  isSetupSuppressed(
    sessionID: string | null,
  ): boolean {
    return Boolean(
      sessionID &&
      Boolean(
        this.setupSuppressed.get(
          sessionID,
        )?.size,
      ),
    )
  }

  markSetupSuppressed(
    sessionID: string,
    inputID = sessionID,
  ) {
    let inputs =
      this.setupSuppressed.get(
        sessionID,
      )

    if (!inputs) {
      inputs = new Set<string>()
      this.setupSuppressed.set(
        sessionID,
        inputs,
      )
    }

    inputs.add(inputID)
  }

  clearSetupSuppressed(
    sessionID: string,
    inputID?: string,
  ) {
    if (!inputID) {
      this.setupSuppressed.delete(
        sessionID,
      )
      return
    }

    const inputs =
      this.setupSuppressed.get(
        sessionID,
      )

    inputs?.delete(inputID)

    if (!inputs?.size) {
      this.setupSuppressed.delete(
        sessionID,
      )
    }
  }
}
