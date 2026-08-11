import type {
  ContextMode,
  QueryIntent,
} from "../model.ts"

export function classifyQueryIntent(
  query: string,
): QueryIntent {
  const value =
    query.trim().toLowerCase()

  if (!value) {
    return "mixed"
  }

  const personal =
    /\b(?:do you remember|remember my|recall my|what (?:is|are|was|were) my|what (?:do|did) i (?:like|prefer|love|hate|choose|want)|what i (?:like|prefer|love|hate|choose|want)|my favou?rite|my preference|my preferences|what did i (?:say|tell|choose|decide|mention)|prior conversation|previous conversation)\b/i.test(
      value,
    ) ||
    (
      /\b(?:i|me|my|mine)\b/i.test(value) &&
      /\b(?:favou?rite|prefer|preference|like|love|hate|remember|recall|chose|choose|choice|decided|decision|said|told|mentioned|history)\b/i.test(
        value,
      )
    )

  const code =
    /\b(?:symbol|function|method|class|interface|implementation|callers?|callees?|call graph|impact|dependency|dependencies|where (?:is|are).*(?:defined|implemented)|codebase|source code|repo(?:sitory)?|file tree|imports?|references?|inherits?|extends?)\b/i.test(
      value,
    )

  const wiki =
    /\b(?:wiki|documentation|docs?|architecture|design doc|specification|spec\b|runbook|sop\b|adr\b|proposal|decision record|knowledge base)\b/i.test(
      value,
    )

  if (personal && !code && !wiki) {
    return "personal-memory"
  }

  if (code && !personal && !wiki) {
    return "code"
  }

  if (wiki && !personal && !code) {
    return "wiki"
  }

  return "mixed"
}

export function routesForMode(
  query: string,
  mode: ContextMode,
): Array<
  "memory" |
  "wiki" |
  "code"
> {
  if (mode === "memory") {
    return ["memory"]
  }

  if (mode === "wiki") {
    return ["wiki"]
  }

  if (mode === "code") {
    return ["code"]
  }

  if (mode === "all") {
    return [
      "memory",
      "wiki",
      "code",
    ]
  }

  const intent =
    classifyQueryIntent(query)

  if (intent === "personal-memory") {
    return ["memory"]
  }

  if (intent === "wiki") {
    return ["wiki"]
  }

  if (intent === "code") {
    return ["code"]
  }

  /*
   * Unknown/general queries get memory + internal documentation first.
   * CodeGraph is deliberately not sprayed on every question.
   */
  return [
    "memory",
    "wiki",
  ]
}

export function isPersonalMemoryQuery(
  query: string,
): boolean {
  return (
    classifyQueryIntent(query) ===
    "personal-memory"
  )
}
