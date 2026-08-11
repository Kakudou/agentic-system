# Shogi

Shogi is a plain markdown multi-agent harness organized around shogi roles.

It is not an SDK or a runtime service.
That version is expressed through markdown and so it's portable and can be used in any environment that supports markdown.

## Why role separation ?

A single agent can easily mix up asking, planning, editing, judging and presenting. 
This can lead to confusion and errors in the output. 
By separating these roles, we can ensure that each agent is focused on a specific task, leading to more accurate and reliable results.
This also allows to use different models to confront each other and to have a more robust system.

- decisions and user communication stay with one controller agent
- specialists contribute only within their assigned boundaries
- evidence, execution, and validation reman independently owned
- simple work avoids unnecessary ceremony, while consequential work is organized in a structured way

```mermaid
flowchart LR
  U[User] --> O[Ōshō: controller]
  O -->|simple, clear request| R[Direct response]
  O -->|complex, risky, multi-file, or external work| S[Relevant role owners]
  S --> O
  O --> F[Final response]
```

Ōshō is the only user-facing role. Specialists do not address users or orchestrate one another.

## The board

| Role                        | Responsibility                                                                                                      |
| ---                         | ---                                                                                                                 |
| **Ōshō** - King             | Sole user-facing controller. Selects mode, preserves constraints, delegates work, and synthesizes accepted results. |
| **Kakugyō** - Bishop        | Planning and dependent sequencing when they add value.                                                              |
| **Kinshō** - Gold General   | Requirements, scope, acceptance criteria, and fairness.                                                             |
| **Ginshō** - Silver General | Independent validation of evidence, rules, rewards, and canon.                                                      |
| **Hisha** - Rook            | Clear presentation of accepted, evidence-grounded material.                                                         |
| **Kyōsha** - Lance          | Read-only evidence gathering, repository inspection, and public-web research.                                       |
| **Fuhyō** - Pawn            | One bounded, checkable execution operation at a time.                                                               |
| **Keima** - Knight          | A bounded challenge of risk, fairness, continuity, or persona fidelity.                                             |

## Repository layout

- [system.md](system.md) — Shared system contract, modes, routing, and safety boundaries.
- [agents/](agents/) — The eight role contracts.
- [skills/](skills/) — Individual capability contracts at `skills/<name>/SKILL.md`.
- [plugins/](plugins/) — Optional `OpenCodeV2` plugin at `plugins/<name>`, mostly hard guardrails.
- [manual_plugins/](manual_plugins/) — Optional `OpenCodeV2` plugin at `manual_plugins/<name>`, that need to be instruct in opencode.json how to load them.

## Skills layout

The skills directory are organized using a simple JohnnyDecimal pattern following:
| index | prefix         | description                                 |
| ---   | ---            | ---                                         |
| 00    | 00-agent-      | Agentic system management and orchestration |
| 01    | 01-doc-        | Documentation and writing                   |
| 02    | 02-excalidraw- | Excalidraw diagramming                      |
| 03    | 03-kb-         | Knowledge base                              |
| 04    | 04-git-        | Git and version control                     |
| 05    | 05-dev-        | Development and programming                 |
| 06    | 06-python-     | Python programming                          |
| 07    | 07-opencti-    | OpenCTI                                     |
| 08    | 08-openaev-    | OpenAEV                                     |
| 09    | 09-rp-         | Roleplaying Chatbot                         |
| 10    | 10-rpg         | Global Pen&Paper                            |
| 11    | 11-shadowrun-  | Shadowrun Pen&Paper                         |
| 12    | 12-bbounty     | Bug bounty and security testing             |
| 97    | 97-gadget-     | Fun Skills                                  |
| 98    | 98-external-   | External Sourced Skills                     |
| 99    | 99-tool-       | Tools and utilities                         |

This helps to keep the skills organized and easy to navigate, while also providing a clear structure for adding new skills in the future.
So using `slash-commands` make them even easier to find and use

Also, and really importantly, this allow to play with the authorization and delegation of the skills to the agents using the blob pattern like:
```
skill:
  '13-rpg-*': deny
  '05-dev-*': allow
  '06-python-*': ask
``` 

## Install

Clone the repository:

```bash
git clone git@github.com:Kakudou/agentic-system.git ~/.agentic-system
```

`system.md` is the global instruction file. Link it, the agents directory, and the skills directory separately.

### OpenCode

```bash
ln -s ~/.agentic-system/system.md ~/.config/opencode/AGENTS.md
ln -s ~/.agentic-system/agents ~/.config/opencode/agents
ln -s ~/.agentic-system/skills ~/.config/opencode/skills
ln -s ~/.agentic-system/plugins ~/.config/opencode/plugins
ln -s ~/.agentic-system/manual_plugins ~/.config/opencode/manual_plugins
```

### Copilot

Copilot’s mapping also needs the delegation adapter because it uses `task` and `read_agent`.

```bash
ln -s ~/.agentic-system/system.md ~/.copilot/copilot-instructions.md
ln -s ~/.agentic-system/agents ~/.copilot/agents
ln -s ~/.agentic-system/skills ~/.copilot/skills
```
## Design principles

- **One public voice.** Ōshō owns user-facing communication and final synthesis.
- **Bounded authority.** Specialists contribute within their roles instead of taking over adjacent concerns.
- **Evidence over assertion.** Results should distinguish verified facts, unavailable capabilities, uncertainty, and remaining risk.
- **Appropriate process.** Escalate when complexity or consequences warrant it; do not perform board ceremony for a trivial request.
- **Plain Markdown.** The harness is a set of readable, inspectable contracts rather than a claimed runtime platform.

## Memory System
Memory system is handled by the usage of [TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory), since no integration exist for OpenCodeV2, we had to create a dedicated plugin to handle it, we have enhanced it with a light dream system.

