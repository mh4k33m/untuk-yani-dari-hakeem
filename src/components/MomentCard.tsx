import { useEffect, useId, useRef, useState } from "react";
import { type Moment } from "@/lib/moments";
import { NoteIllustration } from "./NoteIllustration";

const RIDDLE_IDS = new Set([
  "yani-125255",
  "yani-123795",
  "yani-124513",
  "yani-124679",
  "yani-124993",
  "yani-125106",
]);
const LONG_ID = "yani-125022";

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
  const isRiddle = RIDDLE_IDS.has(m.id) && m.quotes.length > 1;
  const isLong = m.id === LONG_ID;
  let body;
  if (isRiddle) {
    const question = m.quotes.slice(0, -1);
    const answer = m.quotes.at(-1)!;
    const label =
      m.id === "yani-123795" ? "Yang buat aku senyum" : "Jawaban kamu yang sweet sekali";
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
            <span aria-hidden="true">↗</span>
          </button>
        )}
        <div
          ref={answerRef}
          tabIndex={-1}
          id={answerId}
          hidden={!revealed}
          className="revealed-answer animate-rise"
        >
          <Quotes quotes={[answer]} />
        </div>
      </>
    );
  } else body = <Quotes quotes={m.quotes} />;
  return (
    <article
      className={`memory-card ${m.category === "poetry" ? "poetry-card" : ""} ${isLong ? "long-letter-card" : ""} ${index % 2 ? "card-soft-pink" : "card-soft-cream"}`}
    >
      <div className="memory-heading">
        <h3>{m.title}</h3>
        <NoteIllustration momentId={m.id} />
      </div>
      <div className="memory-body">{body}</div>
    </article>
  );
}
