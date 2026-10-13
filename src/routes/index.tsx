import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Tulip } from "@/components/Decor";
import { HighlightCard } from "@/components/MomentCard";
import { SeasideScene } from "@/components/Seaside";
import { LittleThings } from "@/components/LittleThings";
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
  const [open, setOpen] = useState(false);
  const letterRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (open) {
      letterRef.current?.focus({ preventScroll: true });
      letterRef.current?.scrollIntoView({ block: "start" });
    }
  }, [open]);
  return (
    <main className="romantic-site">
      <Hero open={open} onOpen={() => setOpen(true)} />
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
          <LittleThings />
          <Favourites />
          <Closing />
        </div>
      )}
    </main>
  );
}

function Hero({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <header className={`romantic-hero ${open ? "hero-open" : ""}`}>
      <div className="gift-mark">
        <Tulip className="gift-flower" />
        <span>
          Hakeem <span aria-hidden="true">→</span> Yani
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="handwritten hero-note">a little something, just for you</p>
          <h1>
            Untuk <em>Yani.</em>
          </h1>
          <p className="hero-description">
            A little sunset, a few tulips,
            <br />
            and something I want to say.
          </p>
          {!open ? (
            <div className="hero-actions">
              <button className="gift-button" onClick={onOpen}>
                Buka surat aku <span aria-hidden="true">↗</span>
              </button>
              <button className="text-button" onClick={onOpen}>
                Terus baca
              </button>
            </div>
          ) : (
            <a className="text-button hero-return" href="#letter">
              Surat untuk kamu <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
        <div className="scene-postcard">
          <div className="postcard-tape" aria-hidden="true" />
          <SeasideScene className="hero-scene" />
          <div className="postcard-caption">
            <span>langit, laut & senja</span>
            <span aria-hidden="true">♡</span>
          </div>
        </div>
      </div>
      <p className="hero-bottom-note">the things you like, in a little place of your own</p>
    </header>
  );
}

function Favourites() {
  const [limit, setLimit] = useState(5);
  return (
    <section aria-labelledby="simpan" className="favourites-section">
      <div className="section-heading">
        <p className="handwritten">your pantun, your jokes, your words</p>
        <h2 id="simpan">Yang buat aku senyum</h2>
        <p>Antara favourites aku. Starting with Jarjit, of course 🤏🏻</p>
      </div>
      <div className="favourites-list">
        {moments.slice(0, limit).map((m, i) => (
          <HighlightCard key={m.id} m={m} index={i} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {limit} of {moments.length} favourites shown.
      </p>
      {limit < moments.length && (
        <div className="read-more-wrap">
          <button
            className="read-more-button"
            onClick={() => setLimit((l) => Math.min(l + 5, moments.length))}
          >
            Read {moments.length - limit} more <span aria-hidden="true">↓</span>
          </button>
        </div>
      )}
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
