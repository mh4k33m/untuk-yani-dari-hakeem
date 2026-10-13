import { describe, expect, it } from "vitest";
import { HIGHLIGHT_IDS, filterMoments, moments } from "@/lib/moments";

describe("moments", () => {
  it("contains the 25 selected favourites", () => expect(moments.length).toBe(25));
  it("every highlight exists", () =>
    HIGHLIGHT_IDS.forEach((id) => expect(moments.find((m) => m.id === id)).toBeTruthy()));
  it("no memory carries a reply written for Hakeem", () =>
    expect(moments.every((m) => !m.response)).toBe(true));
  it("search matches quote text", () =>
    expect(filterMoments(moments, "all", "jarjit").some((m) => m.id === "yani-125255")).toBe(true));
  it("category filter is chronological", () => {
    const l = filterMoments(moments, "poetry", "");
    expect(l.every((m) => m.category === "poetry")).toBe(true);
    expect(l[0]?.date).toBe("26.09.2026");
  });
});
