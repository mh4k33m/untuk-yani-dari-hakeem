import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { Route } from "@/routes/index";

const Page = Route.options.component!;

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: () => {},
  });
});
afterEach(cleanup);

function openLetter() {
  render(<Page />);
  fireEvent.click(screen.getByRole("button", { name: "Buka surat aku" }));
  return within(screen.getByRole("region", { name: "Yang buat aku senyum" }));
}

describe("personal site experience", () => {
  it("shows five favourites first and adds five per click without duplicates", () => {
    const gallery = openLetter();
    expect(gallery.getAllByRole("article")).toHaveLength(5);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    for (const remaining of [20, 15, 10, 5]) {
      fireEvent.click(gallery.getByRole("button", { name: `Read ${remaining} more` }));
      expect(gallery.getAllByRole("article")).toHaveLength(30 - remaining);
    }
    expect(gallery.queryByRole("button", { name: /Read \d+ more/ })).not.toBeInTheDocument();
    const titles = gallery.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(new Set(titles).size).toBe(25);
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

  it("opens one little note at a time", () => {
    openLetter();
    const tulips = screen.getByRole("button", { name: "Tulips" });
    const iceCream = screen.getByRole("button", { name: "Strawberry & vanilla" });
    fireEvent.click(tulips);
    expect(tulips).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(tulips.getAttribute("aria-controls")!)).toBeVisible();
    fireEvent.click(iceCream);
    expect(tulips).toHaveAttribute("aria-expanded", "false");
    expect(iceCream).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(iceCream.getAttribute("aria-controls")!)).toBeVisible();
  });
});
