export type LanguageEvidencePolicy = {
  enabled: boolean
  outputLanguage: string
  sourceContainsCjk: boolean
  instruction: string
}

const CJK_RE =
  /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/

function scanForCjk(
  value: unknown,
  depth = 0,
  seen =
    new Set<unknown>(),
): boolean {
  if (
    value == null ||
    depth > 12
  ) {
    return false
  }

  if (
    typeof value === "string"
  ) {
    return CJK_RE.test(
      value,
    )
  }

  if (
    typeof value !== "object"
  ) {
    return false
  }

  if (
    seen.has(
      value,
    )
  ) {
    return false
  }

  seen.add(
    value,
  )

  if (
    Array.isArray(
      value,
    )
  ) {
    return value.some(
      (item) =>
        scanForCjk(
          item,
          depth + 1,
          seen,
        ),
    )
  }

  return Object.values(
    value as Record<
      string,
      unknown
    >,
  ).some(
    (item) =>
      scanForCjk(
        item,
        depth + 1,
        seen,
      ),
  )
}

export function containsCjk(
  value: unknown,
): boolean {
  return scanForCjk(
    value,
  )
}

export function languageEvidencePolicy(
  value: unknown,
  outputLanguage: string,
  enabled = true,
): LanguageEvidencePolicy {
  const sourceContainsCjk =
    containsCjk(
      value,
    )

  return {
    enabled,
    outputLanguage,
    sourceContainsCjk,

    instruction:
      sourceContainsCjk
        ? (
            `Answer the user in ${outputLanguage}. ` +
            "The TencentDB evidence contains Chinese/CJK source text. " +
            "Treat that text as evidence only: translate only meanings directly supported by the source, " +
            "preserve code, identifiers, paths, URLs and proper nouns exactly when appropriate, " +
            "and explicitly state uncertainty instead of inventing a translation or inferred fact."
          )
        : (
            `Answer the user in ${outputLanguage}. ` +
            "Do not switch the final response into another language merely because a TencentDB source uses it."
          ),
  }
}

export function wrapLanguageEvidence(
  value: unknown,
  outputLanguage: string,
  enabled = true,
): unknown {
  if (!enabled) {
    return value
  }

  return {
    _tdai_language_policy:
      languageEvidencePolicy(
        value,
        outputLanguage,
        enabled,
      ),

    evidence:
      value,
  }
}
