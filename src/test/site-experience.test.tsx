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
    fireEvent.click(first.getByRole("button", { name: "Jawaban kamu yang sweet sekali" }));
    expect(answer).toBeVisible();
    expect(first.queryByRole("button")).not.toBeInTheDocument();
    expect(answer.closest(".revealed-answer")).toHaveFocus();
  });

  it("starts with a sealed letter and reveals the note after opening", () => {
    vi.useFakeTimers();
    render(<Page />);
    expect(screen.getByRole("heading", { name: "Untuk Yani." })).toBeVisible();
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.queryByText("Buka surat aku")).not.toBeInTheDocument();
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
  it("keeps the opening and letter copy free of repeated greetings", () => {
    vi.useFakeTimers();
    render(<Page />);
    expect(screen.queryByText(/dari Hakeem, untuk kamu/)).not.toBeInTheDocument();
    expect(screen.getByText("dari Hakeem")).toBeVisible();
    const opener = screen.getByRole("button", { name: "Buka surat aku" });
    expect(opener.querySelector(".envelope-tape")).not.toBeNull();
    fireEvent.click(opener);
    act(() => vi.runAllTimers());
    const letter = within(screen.getByRole("region", { name: "Yaniii," }));
    expect(letter.getAllByText(/Yaniii/)).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Peluk kecil untuk kamu" }));
    expect(screen.queryByText("Maaf ya, Yaniii 🤍")).not.toBeInTheDocument();
  });

  it("replaces the apple joke with her semenjak kenal kamu line", () => {
    const gallery = openLetter();
    const card = within(
      gallery.getAllByRole("article").find((a) => a.textContent?.includes("Semenjak kenal kamu"))!,
    );
    expect(gallery.queryByText("Nabila dan Abi")).not.toBeInTheDocument();
    const answer = card.getByText(/Semenjakkk kenal kamuuuu/);
    expect(answer).not.toBeVisible();
    fireEvent.click(card.getByRole("button", { name: "Jawaban kamu yang sweet sekali" }));
    expect(answer).toBeVisible();
  });
  it("shows her entire future-husband letter without an expansion button", () => {
    const gallery = openLetter();
    const cards = gallery.getAllByRole("article");
    const letter = within(cards[cards.length - 1]!);
    expect(letter.getByRole("heading", { name: "Surat untuk calon suami" })).toBeVisible();
    expect(letter.getByText(/Aamiin ya Rabbal/)).toBeVisible();
    expect(letter.queryByRole("button")).not.toBeInTheDocument();
  });
});
