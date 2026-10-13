import raw from "@/data/moments.json";

export type Category = "poetry" | "wordplay" | "affection" | "values";
export type Moment = {
  id: string;
  category: Category;
  title: string;
  date: string;
  quotes: string[];
  response?: string | null;
  excerpt?: boolean;
};

export const moments = raw as Moment[];

export const CATEGORY_LABEL: Record<Category, string> = {
  poetry: "Pantun & puisi",
  wordplay: "Gurauan manis",
  affection: "Perhatian",
  values: "Tentang masa depan",
};

export const HIGHLIGHT_IDS = [
  "yani-125255",
  "yani-124513",
  "yani-124993",
  "yani-125106",
  "yani-124679",
];

const MONTHS = ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"];

export function formatDate(d: string) {
  const [dd, mm] = d.split(".");
  return `${Number(dd)} ${MONTHS[Number(mm) - 1] ?? ""}`;
}

function dateKey(d: string) {
  const [dd, mm, yy] = d.split(".");
  return `${yy}${mm}${dd}`;
}

/** Chronological by date; ties keep source order (stable sort). */
export function sortChronological(list: Moment[]) {
  return [...list].sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)));
}

export function filterMoments(list: Moment[], cat: Category | "all", query: string) {
  const q = query.trim().toLowerCase();
  return sortChronological(
    list.filter(
      (m) =>
        (cat === "all" || m.category === cat) &&
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.quotes.some((x) => x.toLowerCase().includes(q))),
    ),
  );
}
