import { describe, expect, it } from "vitest";
import { HIGHLIGHT_IDS, filterMoments, moments } from "@/lib/moments";

describe("moments", () => {
  it("contains all 157 moments", () => expect(moments.length).toBe(157));
  it("every highlight exists", () => HIGHLIGHT_IDS.forEach((id) => expect(moments.find((m) => m.id === id)).toBeTruthy()));
  it("search matches quote text", () => expect(filterMoments(moments, "all", "jarjit").some((m) => m.id === "yani-125255")).toBe(true));
  it("category filter is chronological", () => {
    const l = filterMoments(moments, "poetry", "");
    expect(l.every((m) => m.category === "poetry")).toBe(true);
    expect(l[0]?.date).toBe("26.09.2026");
  });
});
