import {
  loadConfig,
} from "./config.ts"

import {
  CaptureService,
} from "./application/capture-service.ts"

import {
  ContextService,
} from "./application/context-service.ts"

import {
  KnowledgeAssetResolver,
} from "./application/knowledge-assets.ts"

import {
  RetrievalGuard,
} from "./application/retrieval-budget.ts"

import {
  DreamCommitter,
} from "./application/dream/dream-committer.ts"

import {
  DreamSampler,
} from "./application/dream/dream-sampler.ts"

import {
  DreamSessionRegistry,
} from "./application/dream/dream-session-registry.ts"

import {
  OpenCodeLifecycle,
} from "./adapters/opencode/lifecycle.ts"

import {
  installAgentPolicy,
  installTurnAwareWebGuard,
} from "./adapters/opencode/guardrails.ts"

import {
  registerTools,
} from "./adapters/opencode/tools.ts"

import {
  installDreamExecutionGuard,
} from "./adapters/opencode/dream/guard.ts"

import {
  registerDreamTools,
} from "./adapters/opencode/dream/tools.ts"

import {
  TurnStore,
} from "./adapters/opencode/turn-store.ts"

import {
  FileTrace,
} from "./infrastructure/observability/trace.ts"

import {
  TencentKnowledgeClient,
} from "./infrastructure/tencent/knowledge-client.ts"

import {
  TencentMemoryV3Client,
} from "./infrastructure/tencent/memory-v3-client.ts"

const PLUGIN_ID =
  "kakudou.tencentdb-memory"

const PROCESS_REGISTRY_KEY =
  "__kakudou_tencentdb_memory__"

type LiveInstance = {
  stop: () => Promise<void>
}

/*
 * OpenCode V2 may re-run a plugin's setup() within a single server process,
 * and re-imports may even produce fresh module instances. A process-wide
 * registry lets each new setup() stop the previous live instance instead of
 * leaking another event loop. globalThis is shared across re-imports; a
 * module-level variable would not be.
 */
function liveInstanceRegistry():
  Record<string, LiveInstance> {
  const globalScope =
    globalThis as any

  if (!globalScope[PROCESS_REGISTRY_KEY]) {
    globalScope[PROCESS_REGISTRY_KEY] = {}
  }

  return globalScope[PROCESS_REGISTRY_KEY]
}

/*
 * OpenCode V2 beta plugin entry.
 *
 * The V2 contract is a default export containing a unique id and setup().
 * Plugin.define() is a convenience helper, not required for this local plugin.
 */
export default {
  id:
    PLUGIN_ID,

  setup:
    async (
      ctx: any,
    ) => {
      const config =
        loadConfig(
          ctx.options,
        )

      const trace =
        new FileTrace(
          config.traceFile,
        )

      trace.reset()

      trace.write(
        "SETUP",
        {
          adapter:
            "v4.0-ddd-dream",

          gateway:
            config.gateway.url,

          knowledge:
            config.knowledge.url,

          instanceID:
            config.memory
              .instanceId,

          teamID:
            config.memory
              .teamId ||
            null,

          userID:
            config.memory
              .userId ||
            null,

          defaultAgentID:
            config.memory
              .defaultAgentId ||
            null,

          agentMap:
            config.memory.agents,

          knowledgeAgentMap:
            config.knowledge
              .agents,

          retrievalGuard: {
            failureThreshold:
              config.retrieval
                .failureThreshold,

            probeCooldownMs:
              config.retrieval
                .probeCooldownMs,

            maxCallsPerTurn:
              config.retrieval
                .maxCallsPerTurn,
          },

          dream: {
            enabled:
              config.dream.enabled,
            pathPrefix:
              config.dream.pathPrefix,
            sample:
              config.dream.sample,
          },

          outputLanguage:
            config.guardrails
              .outputLanguage,

          annotateTencentEvidence:
            config.guardrails
              .annotateTencentEvidence,

          optionKeys:
            (
              ctx.options &&
              typeof ctx.options ===
                "object"
            )
              ? Object.keys(
                  ctx.options,
                )
              : [],

          eventKeys:
            Object.keys(
              ctx.event ?? {},
            ),

          toolKeys:
            Object.keys(
              ctx.tool ?? {},
            ),

          sessionKeys:
            Object.keys(
              ctx.session ?? {},
            ),
        },
      )

      const memory =
        new TencentMemoryV3Client(
          config,
        )

      const knowledge =
        new TencentKnowledgeClient(
          config,
        )

      const turns =
        new TurnStore()

      const guard =
        new RetrievalGuard({
          failureThreshold:
            config.retrieval
              .failureThreshold,

          probeCooldownMs:
            config.retrieval
              .probeCooldownMs,

          maxCallsPerTurn:
            config.retrieval
              .maxCallsPerTurn,

          trace,
        })

      const dreamSessions =
        new DreamSessionRegistry()

      const dreamSampler =
        new DreamSampler(
          config,
          memory,
          dreamSessions,
          trace,
        )

      const dreamCommitter =
        new DreamCommitter(
          config,
          memory,
          dreamSessions,
          trace,
        )

      const capture =
        new CaptureService(
          config,
          memory,
          trace,
        )

      const assets =
        new KnowledgeAssetResolver(
          config,
          knowledge,
          trace,
        )

      const context =
        new ContextService(
          config,
          memory,
          knowledge,
          assets,
          trace,
        )

      const lifecycle =
        new OpenCodeLifecycle(
          turns,
          capture,
          guard,
          dreamSessions,
          trace,
        )

      /*
       * Turn capture is intentionally event-driven: it waits for completed
       * execution lifecycle events rather than mutating provider requests.
       * Request hooks are used by other runtime plugins for different jobs.
       */
      trace.write(
        "CAPTURE_LIFECYCLE_EVENT_DRIVEN",
        {
          reason:
            "completed-turn capture consumes the public V2 event stream",
        },
      )

      await installAgentPolicy(
        ctx,
        config,
        trace,
      )

      await installTurnAwareWebGuard(
        ctx,
        config,
        turns,
        guard,
        trace,
      )

      await installDreamExecutionGuard(
        ctx,
        config,
        dreamSessions,
        turns,
        trace,
      )

      const stopLifecycle =
        lifecycle.run(ctx)

      const entry:
        LiveInstance =
          {
            stop:
              async () => {
                await stopLifecycle()

                capture.stop()

                const registry =
                  liveInstanceRegistry()

                if (
                  registry[PLUGIN_ID] ===
                    entry
                ) {
                  delete registry[PLUGIN_ID]
                }
              },
          }

      const previous =
        liveInstanceRegistry()[PLUGIN_ID]

      liveInstanceRegistry()[PLUGIN_ID] =
        entry

      /*
       * Register this instance immediately so a re-setup can stop it even if
       * a later install step fails. The new lifecycle is already running, so
       * stopping the previous live instance now leaves no uncovered event
       * window; any overlap is harmless because the process-wide capture
       * dedup in CaptureService suppresses a second POST for the same turn.
       */
      if (previous) {
        trace.write(
          "SETUP_REPLACE_PREVIOUS",
          {
            id:
              PLUGIN_ID,
          },
        )

        try {
          await previous.stop()
        } catch (error) {
          trace.write(
            "SETUP_PREVIOUS_STOP_FAILED",
            {
              error:
                String(error),
            },
          )
        }
      }

      await registerTools(
        ctx,
        {
          config,
          memory,
          knowledge,
          context,
          assets,
          capture,
          guard,
          turns,
          trace,
        },
      )

      await registerDreamTools(
        ctx,
        {
          config,
          turns,
          sessions:
            dreamSessions,
          sampler:
            dreamSampler,
          committer:
            dreamCommitter,
          trace,
        },
      )

      trace.write(
        "READY",
        {
          adapter:
            "v4.0-ddd-dream",
        },
      )

      return entry.stop
    },
}
