import { useId, useState } from "react";
import { Tulip } from "./Decor";
import { IceCream } from "./Seaside";

const notes = [
  {
    title: "Tulips",
    kind: "tulip",
    text: "Tulips, always 🌷 Bunga yang kamu pilih waktu aku tanya apa yang kamu suka.",
  },
  {
    title: "Strawberry & vanilla",
    kind: "icecream",
    text: "Dua rasa ice cream yang kamu suka. Yang strawberry aja, kan? Vanilla pun aku ingat 🤏🏻",
  },
  {
    title: "Langit & laut",
    kind: "sky",
    text: "The blue sky, light and dark clouds, reflected in the ocean. Kamu cerita macam tu, sampai aku boleh bayangkan.",
  },
  {
    title: "By the water",
    kind: "water",
    text: "An intimate wedding dekat danau atau tepi pantai. Dan suntiang yang kamu nak pakai tu. One day, insyaAllah 🤍",
  },
];

function NoteArt({ kind }: { kind: string }) {
  if (kind === "tulip") return <Tulip className="note-doodle note-tulip" />;
  if (kind === "icecream") return <IceCream className="note-doodle" />;
  return (
    <svg className="note-doodle" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="53" cy="28" r="13" fill="#eac18b" />
      <path d="M9 36c-2-11 8-17 15-11 2-14 21-15 24-1 12-2 18 11 9 15H16Z" fill="#c7d4d3" />
      <path
        d="M7 52q9-7 18 0t18 0 18 0 13 0m-65 11q10-7 20 0t20 0 22 0"
        stroke="#87a5a4"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {kind === "water" && (
        <path d="m30 73 4-17m15 17-3-17m-14 8h16" stroke="#987e69" strokeWidth="2" fill="none" />
      )}
    </svg>
  );
}

export function LittleThings() {
  const [active, setActive] = useState<number | null>(null);
  const uid = useId();
  return (
    <section className="little-things" aria-labelledby="little-things-title">
      <div className="section-heading">
        <p className="handwritten">a few little things about you</p>
        <h2 id="little-things-title">It's the little things.</h2>
      </div>
      <div className="notes-grid">
        {notes.map((note, index) => {
          const id = `${uid}-note-${index}`;
          const expanded = active === index;
          return (
            <div className={`little-note ${expanded ? "note-open" : ""}`} key={note.title}>
              <button
                type="button"
                aria-label={note.title}
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => setActive(expanded ? null : index)}
              >
                <NoteArt kind={note.kind} />
                <span className="note-title">{note.title}</span>
                <span className="note-hint" aria-hidden="true">
                  {expanded ? "close note −" : "a little note +"}
                </span>
              </button>
              <div id={id} hidden={!expanded} className="note-message">
                <p>{note.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
