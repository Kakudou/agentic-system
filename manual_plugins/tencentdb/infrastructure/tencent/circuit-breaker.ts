export class CircuitBreaker {
  private failures = 0
  private openUntil = 0
  private threshold: number
  private openMs: number

  constructor(
    threshold: number,
    openMs: number,
  ) {
    this.threshold = threshold
    this.openMs = openMs
  }

  assertAvailable() {
    const now =
      Date.now()

    if (
      this.openUntil &&
      now < this.openUntil
    ) {
      throw new Error(
        "TencentDB circuit is open",
      )
    }

    if (
      this.openUntil &&
      now >= this.openUntil
    ) {
      this.openUntil = 0
      this.failures = 0
    }
  }

  success() {
    this.failures = 0
    this.openUntil = 0
  }

  failure() {
    this.failures += 1

    if (
      this.failures >=
      this.threshold
    ) {
      this.openUntil =
        Date.now() +
        this.openMs
    }
  }

  snapshot() {
    return {
      failures:
        this.failures,

      open:
        this.openUntil >
        Date.now(),

      openUntil:
        this.openUntil ||
        null,
    }
  }
}
