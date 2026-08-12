# Confirmation And False-Positive Decision Matrix

| Observation | Plausible benign cause | Required control | Assessment state | Action |
| --- | --- | --- | --- | --- |
| Isolated timeout | network loss, rate limit, upstream load | repeat one ordinary baseline request within budget | inconclusive | stop if instability continues |
| Controlled check differs from baseline once | CDN/WAF normalization, application error | compare same route and correlation value in controlled environment | inconclusive | do not claim desynchronization |
| Difference repeats only at one protocol boundary | documented proxy translation or policy | owner confirms path and a separate benign baseline remains stable | potential desync | escalate for controlled confirmation |
| Difference repeats in a controlled environment with stable baselines and trace evidence | none identified | independent reviewer checks records and scope | confirmed in controlled environment | report; do not extend impact testing |
| Unexpected response association, user data, state change, or cache signal | possible impact | no further requests | stop | notify escalation contact immediately |

## Rules

- A timeout, 4xx, 5xx, or reset alone is never confirmation.
- Use no more than the pre-authorized number of checks. If no number is specified, do not test.
- Do not retry to improve a result after an impact signal or budget limit.
- Preserve redacted baseline/control comparison and timestamps for every decision.
