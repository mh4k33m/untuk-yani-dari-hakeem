import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

const Page = Route.options.component!;

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: () => {},
  });
});
beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = this.id === "simpan" ? 1000 - window.scrollY : 0;
    return {
      top,
      bottom: top + 80,
      left: 0,
      right: 400,
      width: 400,
      height: 80,
      x: 0,
      y: top,
      toJSON: () => ({}),
    };
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
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
    fireEvent.click(first.getByRole("button", { name: "Yang buat aku malu 🫠" }));
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
    fireEvent.click(screen.getByRole("button", { name: "Satu hal lagi" }));
    expect(screen.getByText(/Aku harap kamu rasa dihargai/)).toBeVisible();
    expect(screen.queryByRole("button", { name: "Satu hal lagi" })).not.toBeInTheDocument();
  });

  it("replaces the apple joke with her semenjak kenal kamu line", () => {
    const gallery = openLetter();
    const card = within(
      gallery.getAllByRole("article").find((a) => a.textContent?.includes("Semenjak kenal kamu"))!,
    );
    expect(gallery.queryByText("Nabila dan Abi")).not.toBeInTheDocument();
    const answer = card.getByText(/Semenjakkk kenal kamuuuu/);
    expect(answer).not.toBeVisible();
    fireEvent.click(card.getByRole("button", { name: "This made my day" }));
    expect(answer).toBeVisible();
  });
  it("shows ten distinct answer openers and no pantun or long letter", () => {
    const gallery = openLetter();
    const buttons = gallery.getAllByRole("button");
    expect(buttons).toHaveLength(10);
    expect(new Set(buttons.map((button) => button.textContent)).size).toBe(10);
    expect(gallery.queryByText("Surat untuk calon suami")).not.toBeInTheDocument();
    expect(gallery.queryByText("Sunset dan hati lengket")).not.toBeInTheDocument();
    const mie = within(gallery.getAllByRole("article")[4]!);
    const answer = mie.getByText("Me And You lahhhhhhhhhhhhhhhh😌");
    expect(answer).not.toBeVisible();
    fireEvent.click(mie.getByRole("button", { name: "I like the sound of this" }));
    expect(answer).toBeVisible();
    expect(mie.getByText("Gimana cara bacanya dan bunyinya?")).toBeVisible();
  });
  it("offers a down-arrow scroll control that takes her to the favourites", () => {
    openLetter();
    const cue = screen.getByRole("button", { name: "Scroll down" });
    fireEvent.click(cue);
    expect(screen.getByRole("heading", { name: "Yang buat aku senyum" })).toHaveFocus();
    vi.stubGlobal("scrollY", 1000);
    fireEvent.scroll(window);
    expect(screen.queryByRole("button", { name: "Scroll down" })).not.toBeInTheDocument();
    vi.stubGlobal("scrollY", 100);
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: "Scroll down" })).toBeVisible();
  });

  it("keeps the cue through a small scroll, hides near favourites, and reappears above them", () => {
    openLetter();
    expect(screen.getByRole("button", { name: "Scroll down" })).toBeVisible();
    vi.stubGlobal("scrollY", 100);
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: "Scroll down" })).toBeVisible();
    vi.stubGlobal("scrollY", 820);
    fireEvent.scroll(window);
    expect(screen.queryByRole("button", { name: "Scroll down" })).not.toBeInTheDocument();
    vi.stubGlobal("scrollY", 100);
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: "Scroll down" })).toBeVisible();
  });
});
