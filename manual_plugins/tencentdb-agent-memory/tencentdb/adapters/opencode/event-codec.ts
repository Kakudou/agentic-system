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

const INPUT_METADATA_KEYS =
  new Set([
    "id",
    "inputID",
    "inputId",
    "sessionID",
    "sessionId",
    "session_id",
    "created",
    "updated",
    "agent",
    "model",
    "modelID",
    "providerID",
  ])

function metadataString(
  value: string,
): boolean {
  return (
    /^(?:ses|inp|msg|evt|run|step|tool)_[A-Za-z0-9_-]+$/.test(
      value,
    )
  )
}

function inputTextDeep(
  value: unknown,
  keyHint = "",
  depth = 0,
): string {
  if (
    value == null ||
    depth > 10
  ) {
    return ""
  }

  if (
    typeof value ===
      "string"
  ) {
    const trimmed =
      value.trim()

    if (
      !trimmed ||
      INPUT_METADATA_KEYS.has(
        keyHint,
      ) ||
      metadataString(trimmed)
    ) {
      return ""
    }

    return trimmed
  }

  if (Array.isArray(value)) {
    return value
      .map(
        (item) =>
          inputTextDeep(
            item,
            keyHint,
            depth + 1,
          ),
      )
      .filter(Boolean)
      .join("\n")
      .trim()
  }

  if (!isObject(value)) {
    return ""
  }

  for (
    const key of [
      "text",
      "content",
      "prompt",
      "message",
      "parts",
      "value",
      "body",
      "segments",
      "messages",
      "input",
      "data",
      "payload",
    ]
  ) {
    if (!(key in value)) {
      continue
    }

    const found =
      inputTextDeep(
        value[key],
        key,
        depth + 1,
      )

    if (found) {
      return found
    }
  }

  for (
    const [
      key,
      child,
    ] of Object.entries(value)
  ) {
    if (
      INPUT_METADATA_KEYS.has(
        key,
      ) ||
      key === "type" ||
      key === "kind" ||
      key === "role"
    ) {
      continue
    }

    const found =
      inputTextDeep(
        child,
        key,
        depth + 1,
      )

    if (found) {
      return found
    }
  }

  return ""
}

export function inputTextFromEvent(
  event: any,
): string {
  const data =
    eventData(event)

  return (
    inputTextDeep(
      data?.input,
      "input",
    ) ||
    inputTextDeep(
      data?.prompt,
      "prompt",
    ) ||
    inputTextDeep(
      data?.message,
      "message",
    ) ||
    inputTextDeep(
      data?.parts,
      "parts",
    ) ||
    inputTextDeep(
      data?.content,
      "content",
    ) ||
    inputTextDeep(
      data?.text,
      "text",
    )
  )
}

export function inputShape(
  value: unknown,
  depth = 0,
): unknown {
  if (value == null) {
    return null
  }

  if (
    typeof value ===
      "string"
  ) {
    return {
      type:
        "string",
      chars:
        value.length,
    }
  }

  if (
    typeof value ===
      "number" ||
    typeof value ===
      "boolean"
  ) {
    return {
      type:
        typeof value,
    }
  }

  if (Array.isArray(value)) {
    if (depth >= 3) {
      return {
        type:
          "array",
        length:
          value.length,
      }
    }

    return {
      type:
        "array",
      length:
        value.length,
      items:
        value
          .slice(0, 4)
          .map(
            (item) =>
              inputShape(
                item,
                depth + 1,
              ),
          ),
    }
  }

  if (isObject(value)) {
    const keys =
      Object.keys(value)

    if (depth >= 3) {
      return {
        type:
          "object",
        keys,
      }
    }

    const children:
      Record<string, unknown> = {}

    for (
      const key of
        keys.slice(0, 12)
    ) {
      children[key] =
        inputShape(
          value[key],
          depth + 1,
        )
    }

    return {
      type:
        "object",
      keys,
      children,
    }
  }

  return {
    type:
      typeof value,
  }
}
