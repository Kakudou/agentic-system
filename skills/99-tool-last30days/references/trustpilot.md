# Trustpilot

## Purpose

Use Trustpilot for recent self-selected customer-review evidence about companies, products, and services.

## When to use

Use when user experience, service quality, support, fulfillment, billing, or customer complaints/praise are decision-relevant.

## Entity resolution

Resolve the correct company/domain review page. Avoid similarly named businesses and regional/domain variants that represent different entities.

## Preferred access

Use the direct Trustpilot company review page keyed by the company domain and inspect recent individual reviews when possible.

## Fallback access

Use domain-restricted web search to locate the correct review page and recent review snippets; snippet-only access implies partial coverage.

## Query recipes

- `site:trustpilot.com/review "{company}"`
- `site:trustpilot.com/review {company-domain}`
- `site:trustpilot.com/review/{company-domain} "{topic}"`

## Evidence to extract

- review date
- individual review rating
- review text
- company reply when relevant
- overall score only as a current snapshot

## Freshness validation

Use individual review dates for recent-experience claims. A current aggregate rating does not prove 30-day movement without historical data.

## Quality traps

- self-selection bias
- review manipulation/disputes
- aggregate rating treated as prevalence
- current score mistaken for recent trend
- regional/entity mismatch

## Coverage semantics

`covered` when the correct page and relevant recent reviews are inspectable; `covered-no-results` after reliable page search; `partial` when only snippets/aggregate data are accessible; `unavailable` when Trustpilot cannot be reliably reached.
