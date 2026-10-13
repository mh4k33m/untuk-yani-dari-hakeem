import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Tulip } from "@/components/Decor";
import { HighlightCard } from "@/components/MomentCard";
import { SeasideScene } from "@/components/Seaside";
import { moments } from "@/lib/moments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Untuk Yani 🌷, dari Hakeem" },
      { name: "description", content: "Untuk kamu, Yani. Dari Hakeem." },
      { property: "og:title", content: "Untuk Yani 🌷, dari Hakeem" },
      { property: "og:description", content: "Untuk Yani 🌷, dari Hakeem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const APOLOGY = [
  "Yaniii, I'm sorry for what I said tadi. Bila aku cakap kamu macam udah biasa bagi ayat-ayat tu, aku buat kamu rasa macam aku meragui kamu. I shouldn't have said it that way.",
  "I like your pantun, your random questions, and the way you make me smile. Kadang aku malu sampai tak tahu nak balas apa 🫠 But I don't want my awkward replies to make you feel like I don't appreciate you.",
  "Thank you for being yourself with me. Aku suka kamu seadanya, termasuk yang suka bergurau dan bagi ayat manis tu. I kept a few of my favourites here. Just wanted you to know they mean something to me 🤍",
];

function Index() {
  const [phase, setPhase] = useState<"sealed" | "opening" | "open">("sealed");
  const open = phase === "open";
  useEffect(() => {
    if (phase !== "opening") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setPhase("open"), reduced ? 0 : 1150);
    return () => window.clearTimeout(timer);
  }, [phase]);
  const letterRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (open) {
      letterRef.current?.focus({ preventScroll: true });
      letterRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [open]);
  return (
    <main className="romantic-site">
      {!open && <Envelope opening={phase === "opening"} onOpen={() => setPhase("opening")} />}
      {open && (
        <div className="opened-letter">
          <section aria-labelledby="letter" className="letter-section">
            <div className="letter-sheet animate-rise">
              <div className="letter-topline">
                <span>untuk kamu</span>
                <Tulip className="letter-flower" />
              </div>
              <h2 id="letter" ref={letterRef} tabIndex={-1}>
                Yaniii,
              </h2>
              <div className="letter-copy">
                {APOLOGY.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="signature">dari aku, Hakeem</p>
            </div>
          </section>
          <Favourites />
          <Closing />
        </div>
      )}
    </main>
  );
}

function Envelope({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <header className={`envelope-intro ${opening ? "envelope-opening" : ""}`}>
      <p className="envelope-from">dari Hakeem, untuk kamu</p>
      <h1>
        Untuk <em>Yani.</em>
      </h1>
      <button
        className="envelope-button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Buka surat aku"
        aria-busy={opening}
      >
        <span className="envelope" aria-hidden="true">
          <span className="envelope-paper">
            <span className="handwritten">Yaniii,</span>
            <span className="paper-rule" />
            <span className="paper-rule" />
            <span className="paper-rule short-rule" />
          </span>
          <span className="envelope-pocket" />
          <span className="envelope-flap" />
          <span className="envelope-seal">
            <Tulip className="seal-flower" />
          </span>
        </span>
        <span className="envelope-prompt" aria-hidden="true">
          Buka surat aku <span>↗</span>
        </span>
      </button>
      <p className="envelope-whisper">something I wanted you to know.</p>
      <p className="sr-only" role="status">
        {opening ? "Opening your letter…" : ""}
      </p>
    </header>
  );
}

function Favourites() {
  return (
    <section aria-labelledby="simpan" className="favourites-section">
      <div className="section-heading">
        <p className="handwritten">your pantun, your jokes, your words</p>
        <h2 id="simpan">Yang buat aku senyum</h2>
        <p>Antara favourites aku. Starting with Jarjit, of course 🤏🏻</p>
      </div>
      <div className="favourites-list">
        {moments.map((m, i) => (
          <HighlightCard key={m.id} m={m} index={i} />
        ))}
      </div>
    </section>
  );
}

function Closing() {
  const [hug, setHug] = useState(false);
  return (
    <footer className="romantic-closing">
      <SeasideScene className="closing-scene" />
      <div className="closing-letter">
        <Tulip className="closing-flower" />
        <p className="handwritten">under the same sky</p>
        <p className="closing-copy">
          Thank you for making me smile, Yani. Aku suka kamu seadanya. Semoga Allah mudahkan yang
          baik untuk kita 🤍
        </p>
        <p className="signature">— Hakeem</p>
        <button className="hug-button" onClick={() => setHug(true)}>
          Peluk kecil untuk kamu <span aria-hidden="true">♡</span>
        </button>
        <p aria-live="polite" className="hug-message">
          {hug ? "Maaf ya, Yaniii 🤍" : ""}
        </p>
        {hug && (
          <div className="hug-tulips" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <Tulip key={i} className="hug-flower" />
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
