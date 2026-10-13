import { useEffect, useId, useRef, useState } from "react";
import { type Moment } from "@/lib/moments";
import { NoteIllustration } from "./NoteIllustration";

const ANSWERS: Record<string, { label: string; startsAt: number }> = {
  "yani-125255": { label: "Yang buat aku malu 🫠", startsAt: 2 },
  "yani-124513": { label: "Okay, you got me", startsAt: 3 },
  "yani-124993": { label: "This made my day", startsAt: 2 },
  "yani-125106": { label: "Macam mana aku tak senyum?", startsAt: 1 },
  "yani-124679": { label: "I like the sound of this", startsAt: 2 },
  "yani-123795": { label: "Yang buat hati aku cair", startsAt: 2 },
  "yani-121672": { label: "You made me feel special", startsAt: 1 },
  "yani-123515": { label: "Yang ni manis sangat", startsAt: 1 },
  "yani-121024": { label: "Terus senyum bila baca ni", startsAt: 2 },
  "yani-118526": { label: "Sweet of you to say that", startsAt: 1 },
};

function Quotes({ quotes }: { quotes: string[] }) {
  return (
    <blockquote className="memory-quotes">
      {quotes.map((q, i) => (
        <p key={i} className="quote-text">
          {q}
        </p>
      ))}
    </blockquote>
  );
}

export function HighlightCard({ m, index }: { m: Moment; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const answerId = useId();
  const answerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (revealed) answerRef.current?.focus({ preventScroll: true });
  }, [revealed]);
  const reveal = ANSWERS[m.id];
  let body;
  if (reveal && m.quotes.length > 1) {
    const question = m.quotes.slice(0, reveal.startsAt);
    const answers = m.quotes.slice(reveal.startsAt);
    const label = reveal.label;
    body = (
      <>
        <Quotes quotes={question} />
        {!revealed && (
          <button
            type="button"
            aria-expanded={revealed}
            aria-controls={answerId}
            onClick={() => setRevealed(true)}
            className="memory-action note-button"
          >
            {label}
          </button>
        )}
        <div
          ref={answerRef}
          tabIndex={-1}
          id={answerId}
          hidden={!revealed}
          className="revealed-answer animate-rise"
        >
          <Quotes quotes={answers} />
        </div>
      </>
    );
  } else body = <Quotes quotes={m.quotes} />;
  return (
    <article
      className={`memory-card ${m.category === "poetry" ? "poetry-card" : ""} ${index % 2 ? "card-soft-pink" : "card-soft-cream"}`}
    >
      <div className="memory-heading">
        <h3>{m.title}</h3>
        <NoteIllustration momentId={m.id} />
      </div>
      <div className="memory-body">{body}</div>
    </article>
  );
}
