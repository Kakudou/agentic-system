export function isObject(
  value: unknown,
): value is Record<string, any> {
  return (
    value !== null &&
    typeof value === "object"
  )
}

export function normalizeEvent(
  raw: any,
): any {
  if (raw?.payload?.type) {
    return raw.payload
  }

  if (raw?.event?.type) {
    return raw.event
  }

  return raw
}

export function eventData(
  event: any,
): any {
  if (isObject(event?.data)) {
    return event.data
  }

  if (
    isObject(
      event?.properties,
    )
  ) {
    return event.properties
  }

  return event
}

export function sessionIDFrom(
  value: any,
): string {
  const data =
    eventData(value)

  const candidates = [
    data?.sessionID,
    data?.sessionId,
    data?.session_id,
    data?.session?.id,
    data?.session?.sessionID,
    data?.info?.sessionID,
    data?.message?.sessionID,
    data?.part?.sessionID,
    value?.sessionID,
    value?.sessionId,
    value?.session_id,
    value?.session?.id,
  ]

  for (
    const candidate of
      candidates
  ) {
    if (
      typeof candidate ===
        "string" &&
      candidate
    ) {
      return candidate
    }
  }

  const seen =
    new Set<any>()

  const walk =
    (
      node: unknown,
      depth: number,
    ): string => {
      if (depth > 7) {
        return ""
      }

      if (
        typeof node ===
          "string"
      ) {
        return (
          /^ses_[A-Za-z0-9_-]+$/.test(
            node,
          )
        )
          ? node
          : ""
      }

      if (
        !isObject(node) ||
        seen.has(node)
      ) {
        return ""
      }

      seen.add(node)

      const values =
        Array.isArray(node)
          ? node
          : Object.values(node)

      for (
        const child of values
      ) {
        const found =
          walk(
            child,
            depth + 1,
          )

        if (found) {
          return found
        }
      }

      return ""
    }

  return walk(
    value,
    0,
  )
}

export function assistantMessageIDFrom(
  event: any,
): string {
  const data =
    eventData(event)

  const candidates = [
    data?.assistantMessageID,
    data?.assistantMessageId,
    data?.messageID,
    data?.messageId,
    data?.message?.id,
    data?.part?.messageID,
  ]

  for (
    const candidate of
      candidates
  ) {
    if (
      typeof candidate ===
        "string" &&
      candidate
    ) {
      return candidate
    }
  }

  return ""
}

export function ordinalFrom(
  event: any,
): string {
  const value =
    eventData(event)?.ordinal

  return (
    typeof value === "string" ||
    typeof value === "number"
  )
    ? String(value)
    : ""
}
