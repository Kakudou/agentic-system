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
  RetrievalBudget,
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

/*
 * OpenCode V2 beta plugin entry.
 *
 * Deliberately uses the object ABI proven on next-16813 rather than
 * Plugin.define(), which belongs to newer V2 snapshots.
 */
export default {
  id:
    "kakudou.tencentdb-memory",

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

          retrievalBudget:
            config.retrieval
              .budgetPerTurn,

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

      const budget =
        new RetrievalBudget(
          config.retrieval
            .budgetPerTurn,
        )

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
          budget,
          dreamSessions,
          trace,
        )

      /*
       * No ctx.session.hook(...) on next-16813.
       * The proven event-only capture lifecycle remains untouched.
       */
      trace.write(
        "SESSION_HOOKS_DISABLED",
        {
          reason:
            "event-only capture; request/context hooks are not used on next-16813",
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
        budget,
        trace,
      )

      await installDreamExecutionGuard(
        ctx,
        config,
        dreamSessions,
        turns,
        trace,
      )

      lifecycle.run(ctx)

      await registerTools(
        ctx,
        {
          config,
          memory,
          knowledge,
          context,
          assets,
          capture,
          budget,
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
    },
}
