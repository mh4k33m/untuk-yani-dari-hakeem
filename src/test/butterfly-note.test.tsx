import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ButterflyNote } from "@/components/ButterflyNote";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("butterfly note", () => {
  it("reveals one word per tap, then releases butterflies on further taps", () => {
    vi.useFakeTimers();
    render(<ButterflyNote />);
    for (const phrase of ["you", "you make", "you make me", "you make me smile"]) {
      fireEvent.click(screen.getByRole("button", { name: "Tap for the next word" }));
      expect(screen.getByTestId("tap-words").textContent).toBe(phrase);
      expect(document.querySelectorAll(".butterfly-flight")).toHaveLength(0);
    }
    fireEvent.click(screen.getByRole("button", { name: "Let the butterflies fly" }));
    expect(document.querySelectorAll(".butterfly-flight")).toHaveLength(4);
    act(() => vi.runAllTimers());
    expect(document.querySelectorAll(".butterfly-flight")).toHaveLength(0);
    expect(screen.getByTestId("tap-words")).toHaveTextContent("you make me smile");
  });

  it("limits butterflies during repeated taps", () => {
    vi.useFakeTimers();
    render(<ButterflyNote />);
    for (let i = 0; i < 4; i++)
      fireEvent.click(screen.getByRole("button", { name: "Tap for the next word" }));
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByRole("button", { name: "Let the butterflies fly" }));
      act(() => vi.advanceTimersByTime(250));
    }
    expect(document.querySelectorAll(".butterfly-flight").length).toBeLessThanOrEqual(16);
    act(() => vi.runAllTimers());
    expect(document.querySelectorAll(".butterfly-flight")).toHaveLength(0);
  });

  it("keeps the surprise gentle with reduced motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    render(<ButterflyNote />);
    for (let i = 0; i < 4; i++)
      fireEvent.click(screen.getByRole("button", { name: "Tap for the next word" }));
    fireEvent.click(screen.getByRole("button", { name: "Let the butterflies fly" }));
    expect(document.querySelectorAll(".butterfly-flight")).toHaveLength(0);
    expect(document.querySelectorAll(".resting-butterfly")).toHaveLength(3);
    expect(screen.getByTestId("tap-words")).toHaveTextContent("you make me smile");
  });
});
