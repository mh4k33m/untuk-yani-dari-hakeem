import { useId, useState } from "react";
import { CATEGORY_LABEL, formatDate, type Moment } from "@/lib/moments";
import { Tulip } from "./Decor";

const RIDDLE_IDS = new Set(["yani-125255", "yani-124513", "yani-124679", "yani-124993"]);
const LONG_ID = "yani-125022";

function Quotes({ quotes }: { quotes: string[] }) {
  return (
    <div className="space-y-3">
      {quotes.map((q, i) => (
        <p
          key={i}
          className="quote-text rounded-2xl rounded-tl-sm bg-secondary/70 px-4 py-3 text-[1.02rem] leading-relaxed text-secondary-foreground"
        >
          {q}
        </p>
      ))}
    </div>
  );
}

export function HighlightCard({ m, index }: { m: Moment; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const answerId = useId();
  const isRiddle = RIDDLE_IDS.has(m.id) && m.quotes.length > 1;
  const isLong = m.id === LONG_ID;

  let body;
  if (isRiddle) {
    const question = m.quotes.slice(0, -1);
    const answer = m.quotes.at(-1)!;
    body = (
      <>
        <Quotes quotes={question} />
        <button
          type="button"
          aria-expanded={revealed}
          aria-controls={answerId}
          onClick={() => setRevealed((v) => !v)}
          className="mt-3 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
        >
          {revealed ? "Tutup dulu" : "Baca sambungannya"}
        </button>
        <div id={answerId} hidden={!revealed} className="mt-3 animate-rise">
          <Quotes quotes={[answer]} />
        </div>
      </>
    );
  } else if (isLong) {
    const text = m.quotes[0] ?? "";
    const parts = text.split("\n\n");
    const shown = expanded ? text : parts.slice(0, 3).join("\n\n") + "…";
    body = (
      <>
        <Quotes quotes={[shown]} />
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
        >
          {expanded ? "Ringkaskan" : "Baca surat penuh"}
        </button>
      </>
    );
  } else {
    body = <Quotes quotes={m.quotes} />;
  }

  return (
    <article
      className="paper relative rounded-2xl p-5 sm:p-7"
      style={{ rotate: index % 2 ? "0.4deg" : "-0.4deg" }}
    >
      <Tulip className="absolute -top-4 right-5 h-10 w-6 opacity-80" />
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {CATEGORY_LABEL[m.category]} · {formatDate(m.date)}
      </p>
      <h3 className="mt-1 text-2xl font-semibold text-ink">{m.title}</h3>
      <div className="mt-4" />
      {body}
    </article>
  );
}

export function ArchiveCard({ m }: { m: Moment }) {
  return (
    <article className="paper rounded-xl p-4 sm:p-5">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 text-xl font-semibold text-ink">{m.title}</h3>
        <span className="shrink-0 text-xs text-muted-foreground">{formatDate(m.date)}</span>
      </div>
      <Quotes quotes={m.quotes} />
    </article>
  );
}
