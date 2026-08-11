# Polymarket

## Purpose

Use Polymarket for market-implied probabilities and changes in collective expectations about specifically resolvable future events.

## When to use

Use only when the user asks about predictions, market expectations, odds, or a future event where a matching market materially informs the answer.

## Entity resolution

Resolve the exact market question, event grouping, outcome wording, and resolution criteria. Similar-sounding markets are not interchangeable.

## Preferred access

Use the direct public Polymarket market/event page or a host-native market/finance interface that exposes the exact Polymarket market.

## Fallback access

Use web search to locate the exact market, then open the market page. Avoid quoting stale search snippets as current prices.

## Query recipes

- `site:polymarket.com "{topic}"`
- `site:polymarket.com/event "{entity}"`
- exact market-question wording when known

## Evidence to extract

- exact market question
- current probability/price
- observation time/date
- volume/liquidity when shown
- historical movement only when an actual prior value/time series is visible
- resolution criteria when relevant

## Freshness validation

Current price is fresh only at the observation time. Historical movement claims require directly observed dated history; never infer a 30-day change from one current value.

## Quality traps

- market wording/resolution mismatch
- price treated as factual probability
- thin liquidity ignored
- different markets compared as equivalent
- stale search snippets used as current odds

## Coverage semantics

`covered` when the exact market and current data are inspectable; `covered-no-results` when reliable search shows no matching market; `partial` when market metadata/history is incomplete; `unavailable` when Polymarket cannot be reliably reached.
