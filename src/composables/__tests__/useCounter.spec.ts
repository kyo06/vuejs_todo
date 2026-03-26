import { describe, it, expect } from "vitest";
import { useCounter } from "@/composables/useCounter";

describe("useCounter", () => {
  it("incrémente le compteur", () => {
    const { count, increment } = useCounter();

    increment();
    increment();

    expect(count.value).toBe(2);
  });
});