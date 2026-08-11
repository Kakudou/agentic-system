export type DreamKind =
  | "dream"
  | "nightmare"

export type DreamRole =
  | "orchestrator"
  | "worker"

export type DreamSource = {
  layer:
    | "L0"
    | "L1"
    | "L2"
    | "L3"

  id?: string
  path?: string
  version?: string
  role?: string
  type?: string
  content: string
  background?: string
  timestamp?: string
}

export type DreamSample = {
  sampleId: string
  kind: DreamKind
  entropyFingerprint: string
  createdAt: string
  sources: DreamSource[]
}

export type DreamSessionState = {
  sessionID: string
  generation: number
  role: DreamRole
  openCodeAgent: string
  startedAt: number
  sample?: DreamSample
  committing: boolean
  committed: boolean
  commitPath?: string
  commitVersion?: string
  completedAt?: number
}
