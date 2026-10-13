import { describe, expect, it } from "vitest";
import { HIGHLIGHT_IDS, filterMoments, moments } from "@/lib/moments";

describe("moments", () => {
  it("contains the 10 selected favourites", () => expect(moments.length).toBe(10));
  it("every highlight exists", () =>
    HIGHLIGHT_IDS.forEach((id) => expect(moments.find((m) => m.id === id)).toBeTruthy()));
  it("no memory carries a reply written for Hakeem", () =>
    expect(moments.every((m) => !m.response)).toBe(true));
  it("search matches quote text", () =>
    expect(filterMoments(moments, "all", "jarjit").some((m) => m.id === "yani-125255")).toBe(true));
  it("category filter is chronological", () => {
    const l = filterMoments(moments, "wordplay", "");
    expect(l.every((m) => m.category === "wordplay")).toBe(true);
    expect(l[0]?.date).toBe("28.09.2026");
  });
});
