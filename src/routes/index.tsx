import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, Star, Tulip, Waves } from "@/components/Decor";
import { ArchiveCard, HighlightCard } from "@/components/MomentCard";
import { CATEGORY_LABEL, HIGHLIGHT_IDS, filterMoments, moments, type Category } from "@/lib/moments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yani, aku simpan kata-kata kamu 🌷" },
      { name: "description", content: "Surat kecil dari Hakeem untuk Yani, dan kata-kata manis yang aku simpan." },
      { property: "og:title", content: "Yani, aku simpan kata-kata kamu 🌷" },
      { property: "og:description", content: "Untuk Yani 🌷, dari Hakeem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const APOLOGY = [
  "Yani, aku minta maaf sebab cakap “macam udah biasa aja bagi ayat ayat ginii”. Aku tak patut buat kamu rasa macam aku meragui ketulusan kamu.",
  "Aku hargai kamu jadi diri sendiri dengan aku. Pantun kamu, gurauan semut dan lebah, ayat Jarjit, semua tu buat aku senyum. Aku kadang malu dan lambat cari kata-kata untuk balas, tapi aku tetap perlu jaga cara aku bercakap supaya kamu rasa dihargai.",
  "Kamu tak perlu sorok sisi kamu yang playful tu untuk aku. Aku suka cara kamu bercerita, bergurau, dan buat perkara kecil terasa istimewa. Aku nak belajar mendengar dan membalas dengan lebih lembut.",
  "Aku buat tempat kecil ni untuk kata-kata kamu, sebab aku ingat, aku hargai, dan aku suka menerimanya. 🤍",
];

function Index() {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const letterRef = useRef<HTMLHeadingElement>(null);

  const openLetter = (animate: boolean) => {
    if (animate) setAnimating(true);
    setOpen(true);
  };
  useEffect(() => {
    if (open) {
      letterRef.current?.focus({ preventScroll: true });
      letterRef.current?.scrollIntoView({ block: "start" });
    }
  }, [open]);

  return (
    <main className="min-h-screen">
      <Envelope open={open} animating={animating} onOpen={() => openLetter(true)} onSkip={() => openLetter(false)} />
      {open && (
        <>
          <section aria-labelledby="letter" className="mx-auto max-w-2xl px-5 py-14">
            <div className="paper animate-rise rounded-2xl px-6 py-9 sm:px-10">
              <h1 id="letter" ref={letterRef} tabIndex={-1} className="scroll-mt-8 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Yani, aku simpan kata-kata kamu.
              </h1>
              <div className="mt-6 space-y-5 text-[1.08rem] leading-[1.85]">
                {APOLOGY.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <p className="mt-8 text-right font-hand text-2xl text-primary">— Hakeem</p>
            </div>
          </section>
          <Highlights />
          <Archive />
          <Appreciation />
          <Closing />
        </>
      )}
    </main>
  );
}

function Envelope({ open, animating, onOpen, onSkip }: { open: boolean; animating: boolean; onOpen: () => void; onSkip: () => void }) {
  return (
    <header className={`dusk-sky relative overflow-hidden px-5 ${open ? "pb-6 pt-12" : "flex min-h-[100svh] flex-col justify-center py-12"}`}>
      <Moon className="absolute right-8 top-8 h-12 w-12 drop-shadow" />
      <Star className="absolute left-10 top-14 h-3 w-3" />
      <Star className="absolute left-1/3 top-6 h-2 w-2" />
      <Star className="absolute right-1/3 top-20 h-2.5 w-2.5" />
      <div className="relative mx-auto w-full max-w-sm text-center">
        {!open ? (
          <>
            <div className="paper relative mx-auto aspect-[4/3] w-full rounded-xl [perspective:600px]">
              <div className={`absolute inset-x-0 top-0 h-1/2 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-blush ${animating ? "animate-flap" : ""}`} />
              <div className="flex h-full flex-col items-center justify-end pb-6">
                <Tulip className="mb-2 h-12 w-8" />
                <p className="font-serif text-2xl text-ink">Untuk Yani 🌷,</p>
                <p className="font-hand text-xl text-primary">dari Hakeem</p>
              </div>
            </div>
            <p className="mt-8 font-serif text-xl italic text-ink">Ada kata-kata kamu yang aku mahu simpan baik-baik.</p>
            <button onClick={onOpen} className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5">
              Buka surat kecil ini
            </button>
            <button onClick={onSkip} className="mt-3 text-sm text-muted-foreground underline underline-offset-4">
              Langsung baca tanpa animasi
            </button>
          </>
        ) : (
          <p className="font-serif text-xl text-ink">Untuk Yani 🌷, dari Hakeem</p>
        )}
      </div>
      <Waves className="absolute inset-x-0 bottom-0" />
    </header>
  );
}

function SectionTitle({ id, children, sub }: { id: string; children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <Tulip className="mx-auto mb-2 h-10 w-6" />
      <h2 id={id} className="text-3xl font-semibold text-ink sm:text-4xl">{children}</h2>
      {sub && <p className="mx-auto mt-2 max-w-md text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Highlights() {
  const list = HIGHLIGHT_IDS.map((id) => moments.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section aria-labelledby="ingat" className="mx-auto max-w-2xl px-5 py-12">
      <SectionTitle id="ingat" sub="Kata-kata yang kamu kongsi, dan sedikit balasan dari aku.">Aku ingat yang ini…</SectionTitle>
      <div className="space-y-10">
        {list.map((m, i) => <HighlightCard key={m.id} m={m} index={i} />)}
      </div>
    </section>
  );
}

const TABS: (Category | "all")[] = ["all", "poetry", "wordplay", "affection", "values"];
const PAGE = 12;

function Archive() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const list = useMemo(() => filterMoments(moments, cat, q), [cat, q]);
  useEffect(() => setLimit(PAGE), [cat, q]);

  return (
    <section aria-labelledby="simpan" className="bg-accent/40 px-5 py-14">
      <div className="mx-auto max-w-2xl">
        <SectionTitle id="simpan" sub="Semua yang kamu kirim pada aku, aku letak di sini.">Kata-kata kamu yang aku simpan</SectionTitle>
        <div role="tablist" aria-label="Kategori" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={cat === t}
              onClick={() => setCat(t)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${cat === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-paper text-ink hover:bg-accent"}`}
            >
              {t === "all" ? "Semua" : CATEGORY_LABEL[t]}
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="sr-only">Cari kata-kata kamu</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari kata-kata kamu…"
            className="w-full rounded-full border border-input bg-paper px-5 py-3 text-base placeholder:text-muted-foreground"
          />
        </label>
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">{list.length} kenangan</p>
        <div className="mt-4 space-y-5">
          {list.slice(0, limit).map((m) => <ArchiveCard key={m.id} m={m} />)}
          {list.length === 0 && <p className="text-center text-muted-foreground">Tiada yang sepadan. Cuba perkataan lain.</p>}
        </div>
        {limit < list.length && (
          <div className="mt-8 text-center">
            <button onClick={() => setLimit((l) => l + PAGE)} className="rounded-full border border-primary px-6 py-3 font-medium text-primary hover:bg-paper">
              Baca lagi ({list.length - limit} lagi)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Appreciation() {
  return (
    <section aria-labelledby="hargai" className="mx-auto max-w-2xl px-5 py-14">
      <SectionTitle id="hargai">Yang aku hargai tentang kamu</SectionTitle>
      <div className="paper space-y-4 rounded-2xl px-6 py-8 text-[1.06rem] leading-[1.85]">
        <p>Aku hargai kreativiti kamu. Ada yang kamu tulis sendiri, ada yang kamu jumpa dan kongsi, tapi cara kamu memilih dan menghantarnya pada aku tetap cara kamu sendiri. Semut, mie, semen, Jarjit, kamu boleh buat benda biasa jadi manis.</p>
        <p>Aku hargai kemesraan dan perhatian kamu: pantun selamat pagi, doa supaya tak ada hantu masa aku berlari, langit, laut dan sunset yang kamu bawa masuk dalam kata-kata.</p>
        <p>Aku hargai humor kamu, dan aku hargai harapan kamu tentang cara bercakap yang jujur dan lembut: maaf, tolong, terima kasih, sama-sama. Itu yang aku mahu belajar amalkan.</p>
      </div>
    </section>
  );
}

function Closing() {
  const [hug, setHug] = useState(false);
  return (
    <footer className="dusk-sky relative overflow-hidden px-5 pb-28 pt-16 text-center">
      <Moon className="absolute left-8 top-8 h-10 w-10" />
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
          Terima kasih sebab buat hari aku lebih berwarna, Yani. Aku hargai kamu, termasuk sisi kamu yang suka bergurau dan menulis kata-kata manis. Semoga Allah membimbing kita kepada yang terbaik. 🤍
        </p>
        <p className="mt-4 font-hand text-2xl text-primary">— Hakeem</p>
        <div className="relative mt-10 inline-block">
          {hug && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-4 flex justify-center gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="animate-float-up text-xl" style={{ animationDelay: `${i * 0.15}s` }}>
                  {i % 2 ? "🤍" : <Tulip className="h-8 w-5" />}
                </span>
              ))}
            </div>
          )}
          <button onClick={() => setHug(true)} className="rounded-full bg-paper px-6 py-3 font-medium text-primary shadow-md">
            Peluk kecil untuk kamu
          </button>
        </div>
        <p aria-live="polite" className="mt-5 min-h-7 font-serif text-lg italic text-ink">
          {hug ? "Semoga surat kecil ini buat kamu rasa dihargai." : ""}
        </p>
      </div>
      <Waves className="absolute inset-x-0 bottom-0" />
    </footer>
  );
}
