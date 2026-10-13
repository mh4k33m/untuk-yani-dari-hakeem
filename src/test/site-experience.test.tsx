import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

const Page = Route.options.component!;

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: () => {},
  });
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function openLetter() {
  vi.useFakeTimers();
  render(<Page />);
  fireEvent.click(screen.getByRole("button", { name: "Buka surat aku" }));
  act(() => vi.runAllTimers());
  return within(screen.getByRole("region", { name: "Yang buat aku senyum" }));
}

describe("personal site experience", () => {
  it("shows exactly ten favourites with no load-more or preference notes", () => {
    const gallery = openLetter();
    expect(gallery.getAllByRole("article")).toHaveLength(10);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(gallery.queryByRole("button", { name: /Read \d+ more/ })).not.toBeInTheDocument();
    expect(screen.queryByText("It's the little things.")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "By the water" })).not.toBeInTheDocument();
    const titles = gallery.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(new Set(titles).size).toBe(10);
  });

  it("puts Jarjit first and lets her reveal the original punchline", () => {
    const gallery = openLetter();
    const first = within(gallery.getAllByRole("article")[0]!);
    expect(first.getByRole("heading", { level: 3 })).toHaveTextContent("Jarjit");
    const answer = first.getByText(/Yaaa karna kalo satu satu nya itu kan kamuuuuu/);
    expect(answer).not.toBeVisible();
    fireEvent.click(first.getByRole("button", { name: "Baca sambungannya" }));
    expect(answer).toBeVisible();
  });

  it("starts with a sealed letter and reveals the note after opening", () => {
    vi.useFakeTimers();
    render(<Page />);
    expect(screen.getByRole("heading", { name: "Untuk Yani." })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Yaniii," })).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Buka surat aku" });
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(screen.queryByRole("region", { name: "Yang buat aku senyum" })).not.toBeInTheDocument();
    act(() => vi.runAllTimers());
    expect(screen.queryByRole("button", { name: "Buka surat aku" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Yaniii," })).toHaveFocus();
    expect(screen.getAllByRole("article")).toHaveLength(10);
  });
  it("skips the opening wait when reduced motion is requested", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    render(<Page />);
    fireEvent.click(screen.getByRole("button", { name: "Buka surat aku" }));
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByRole("heading", { name: "Yaniii," })).toHaveFocus();
    expect(screen.getAllByRole("article")).toHaveLength(10);
  });
});
