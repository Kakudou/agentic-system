const SETUP_STEPS =
  new Set([
    "mode",
    "persona_setup",
    "introduction",
  ])

export const SETUP_SUPPRESSION_DENIAL =
  "tencentdb-memory: setup template turns cannot use TencentDB effects"

export function isTrustedSetupMetadata(
  value: unknown,
): boolean {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return false
  }

  const metadata = value as any

  return (
    metadata.kind ===
      "setup_template_step" &&
    metadata.templateSchemaVersion ===
      2 &&
    typeof metadata.step ===
      "string" &&
    SETUP_STEPS.has(
      metadata.step,
    ) &&
    typeof metadata.fingerprint ===
      "string" &&
    /^[0-9a-f]{64}$/.test(
      metadata.fingerprint,
    )
  )
}

export function hasTrustedSetupMarker(
  event: any,
): boolean {
  const direct = [
    event?.metadata,
    event?.message?.metadata,
    event?.data?.item?.metadata,
    event?.item?.metadata,
  ]

  if (
    direct.some(
      isTrustedSetupMetadata,
    )
  ) {
    return true
  }

  if (!Array.isArray(event?.messages)) {
    return false
  }

  for (
    let index =
      event.messages.length - 1;
    index >= 0;
    index--
  ) {
    const message =
      event.messages[index]

    if (
      message?.type === "user" ||
      message?.role === "user"
    ) {
      return isTrustedSetupMetadata(
        message.metadata,
      )
    }
  }

  return false
}
