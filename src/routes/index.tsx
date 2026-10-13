import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ButterflyNote } from "@/components/ButterflyNote";
import { HighlightCard } from "@/components/MomentCard";
import { NoteIllustration } from "@/components/NoteIllustration";
import { SeasideScene } from "@/components/Seaside";
import { moments } from "@/lib/moments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Untuk Yani 🌷, dari Hakeem" },
      { name: "description", content: "Something I wanted you to know." },
      { property: "og:title", content: "Untuk Yani 🌷, dari Hakeem" },
      { property: "og:description", content: "Something I wanted you to know." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:description", content: "Something I wanted you to know." },
    ],
  }),
  component: Index,
});

const APOLOGY = [
  "I'm sorry for what I said tadi. Bila aku cakap kamu macam udah biasa bagi ayat-ayat tu, aku buat kamu rasa macam aku meragui kamu. I shouldn't have said it that way.",
  "I like your pantun, your random questions, and how easy it feels to talk to you. Kadang aku malu sampai tak tahu nak balas apa 🫠 But I don't want my awkward replies to make you feel like I don't appreciate you.",
  "Thank you for being yourself with me. Aku suka kamu seadanya, termasuk yang suka bergurau dan bagi ayat manis tu. I kept a few of my favourites here. Just wanted you to know they mean something to me 🤍",
];

function Index() {
  const [phase, setPhase] = useState<"sealed" | "opening" | "open">("sealed");
  const open = phase === "open";
  const [showScrollCue, setShowScrollCue] = useState(true);
  useEffect(() => {
    if (phase !== "opening") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setPhase("open"), reduced ? 0 : 1550);
    return () => window.clearTimeout(timer);
  }, [phase]);
  const letterRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (open) {
      letterRef.current?.focus({ preventScroll: true });
      letterRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const dismissOnScroll = () => {
      if (window.scrollY > startY + 80) {
        setShowScrollCue(false);
        window.removeEventListener("scroll", dismissOnScroll);
      }
    };
    window.addEventListener("scroll", dismissOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", dismissOnScroll);
  }, [open]);
  return (
    <main className="romantic-site">
      {!open && <Envelope opening={phase === "opening"} onOpen={() => setPhase("opening")} />}
      {open && (
        <div className="opened-letter">
          <section aria-labelledby="letter" className="letter-section">
            <div className="letter-sheet animate-rise">
              <div className="letter-topline">
                <NoteIllustration motif="letter" />
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
          <ButterflyNote />
          <Closing />
        </div>
      )}
      {open && showScrollCue && (
        <div className="scroll-cue-container">
          <button
            type="button"
            className="scroll-cue"
            aria-label="Scroll down"
            onClick={() => {
              setShowScrollCue(false);
              const target = document.getElementById("simpan");
              target?.focus({ preventScroll: true });
              const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              target?.scrollIntoView({ block: "start", behavior: reduced ? "instant" : "smooth" });
            }}
          >
            <span className="scroll-cue-arrow">
              <svg className="scroll-cue-doodle" viewBox="0 0 16 24" fill="none" aria-hidden="true">
                <path
                  d="M8 2v16m-4-4 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Scroll down</span>
          </button>
        </div>
      )}
    </main>
  );
}

function Envelope({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resetTilt = () => {
    buttonRef.current?.style.setProperty("--tilt-x", "0deg");
    buttonRef.current?.style.setProperty("--tilt-y", "0deg");
  };
  return (
    <header className={`envelope-intro ${opening ? "envelope-opening" : ""}`}>
      <p className="envelope-from">dari Hakeem</p>
      <h1>
        Untuk <em>Yani.</em>
      </h1>
      <button
        ref={buttonRef}
        className="envelope-button"
        onPointerMove={(event) => {
          if (opening || event.pointerType !== "mouse") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          event.currentTarget.style.setProperty("--tilt-x", `${-y * 6}deg`);
          event.currentTarget.style.setProperty("--tilt-y", `${x * 8}deg`);
        }}
        onPointerLeave={resetTilt}
        onBlur={resetTilt}
        onClick={() => {
          resetTilt();
          onOpen();
        }}
        disabled={opening}
        aria-label="Buka surat aku"
        aria-busy={opening}
      >
        <span className="envelope" aria-hidden="true">
          <span className="envelope-paper">
            <span className="handwritten">a note for you</span>
            <span className="paper-rule" />
            <span className="paper-rule" />
            <span className="paper-rule short-rule" />
          </span>
          <span className="envelope-pocket" />
          <span className="envelope-flap" />
          <span className="envelope-tape">
            <span className="tape-label">open me ♡</span>
          </span>
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
        <p className="handwritten">your questions, your sweet answers</p>
        <h2 id="simpan" tabIndex={-1}>
          Yang buat aku senyum
        </h2>
        <p>
          Aku suka semua ayat kamu. These are just a few of my favourites, starting with Jarjit 🤏🏻
        </p>
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
  const [lastNote, setLastNote] = useState(false);
  const noteRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (lastNote) noteRef.current?.focus({ preventScroll: true });
  }, [lastNote]);
  return (
    <footer className="romantic-closing">
      <SeasideScene className="closing-scene" />
      <div className="closing-letter">
        <NoteIllustration motif="tulips" className="closing-illustration" />
        <p className="handwritten">under the same sky</p>
        <p className="closing-copy">
          Thank you for letting me get to know this side of you. Aku suka kamu seadanya. Semoga
          Allah mudahkan yang baik untuk kita 🤍
        </p>
        <p className="signature">— Hakeem</p>
        {!lastNote && (
          <button className="last-note-button note-button" onClick={() => setLastNote(true)}>
            Satu hal lagi <span aria-hidden="true">♡</span>
          </button>
        )}
        {lastNote && (
          <p ref={noteRef} tabIndex={-1} className="last-note-message animate-rise">
            Aku harap kamu rasa dihargai bila baca ni. Because you are 🤍
          </p>
        )}
      </div>
    </footer>
  );
}
