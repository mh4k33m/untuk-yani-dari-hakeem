type Motif =
  | "jarjit"
  | "numbers"
  | "home"
  | "bee"
  | "breath"
  | "sea"
  | "stars"
  | "sunset"
  | "rings"
  | "letter"
  | "tulips";

const MOTIFS: Record<string, Motif> = {
  "yani-125255": "jarjit",
  "yani-124513": "numbers",
  "yani-124993": "home",
  "yani-125106": "bee",
  "yani-124658": "breath",
  "yani-123795": "sea",
  "yani-125020": "stars",
  "yani-124804": "sunset",
  "yani-124755": "rings",
  "yani-125022": "letter",
};

const heart = "M0 3C-7-5-13 1-10 7L0 16 10 7C13 1 7-5 0 3Z";

export function NoteIllustration({
  momentId,
  motif,
  className = "",
}: {
  momentId?: string;
  motif?: Motif;
  className?: string;
}) {
  const kind = motif ?? MOTIFS[momentId ?? ""] ?? "letter";
  let drawing;
  switch (kind) {
    case "jarjit":
      drawing = (
        <>
          <path d="M8 12h30q5 0 5 5v17q0 5-5 5H24l-8 7v-7h-8q-5 0-5-5V17q0-5 5-5Z" fill="#f0e2cb" />
          <path
            d="M48 22h23q5 0 5 5v16q0 5-5 5h-7l-7 6v-6h-9q-5 0-5-5V27q0-5 5-5Z"
            fill="#e5c9c1"
          />
          <text x="15" y="31" className="illustration-script">
            2
          </text>
          <text x="54" y="42" className="illustration-script">
            3
          </text>
          <path d={heart} transform="translate(38 44) scale(.6)" fill="#bd858a" stroke="none" />
        </>
      );
      break;
    case "numbers":
      drawing = (
        <>
          <path d="m14 8 48 3-3 46-48-3Z" fill="#f5ecdc" />
          <path d="m52 10-1 10 10 1" />
          <text x="19" y="32" className="illustration-script illustration-math">
            7 + 7
          </text>
          <path d="m21 41 13 1m-12 5 9 1" />
          <path d={heart} transform="translate(46 39) scale(.7)" fill="#bd858a" stroke="none" />
        </>
      );
      break;
    case "home":
      drawing = (
        <>
          <path d="M15 29 39 10 65 29" />
          <path d="M21 26v29h37V26" fill="#f0e2cb" />
          <path d="M54 19v-8h7v13M31 55V40h11v15m6-21h5v6h-5Z" />
          <path d={heart} transform="translate(39 23) scale(.55)" fill="#bd858a" stroke="none" />
          <path d="M10 57h58" stroke="#8ca49d" />
        </>
      );
      break;
    case "bee":
      drawing = (
        <>
          <path d="M7 48c-7-13 3-23 14-14" strokeDasharray="2 4" stroke="#8ca49d" />
          <ellipse cx="35" cy="21" rx="9" ry="12" transform="rotate(-25 35 21)" fill="#dce5dc" />
          <ellipse cx="49" cy="22" rx="9" ry="12" transform="rotate(25 49 22)" fill="#dce5dc" />
          <ellipse cx="44" cy="37" rx="20" ry="12" transform="rotate(-12 44 37)" fill="#dfbd90" />
          <path d="m36 27 4 23m6-25 5 23" strokeWidth="3" />
          <circle cx="59" cy="32" r="1.5" fill="#796858" stroke="none" />
          <path d="m56 25 4-7m-9 7-2-7" />
          <path d={heart} transform="translate(70 12) scale(.4)" fill="#bd858a" stroke="none" />
        </>
      );
      break;
    case "breath":
      drawing = (
        <>
          <path d="M5 34h14l5-10 9 25 9-34 9 19h22" stroke="#8ca49d" />
          <path d={heart} transform="translate(40 13) scale(1.25)" fill="#e5c9c1" />
          <path d="M14 53h16m22 0h12" stroke="#c2ab92" />
        </>
      );
      break;
    case "sea":
      drawing = (
        <>
          <path d={heart} transform="translate(40 9) scale(1.1)" fill="#e5c9c1" />
          <path
            d="M8 34q8-7 16 0t16 0t16 0t16 0M8 44q8-7 16 0t16 0t16 0t16 0M15 54q8-7 16 0t16 0t16 0"
            stroke="#8ca49d"
          />
        </>
      );
      break;
    case "stars":
      drawing = (
        <>
          <path d="M45 10a19 19 0 1 0 20 30 16 16 0 0 1-20-30Z" fill="#f0e2cb" />
          <path
            d="m15 11 2 5 5 2-5 2-2 5-2-5-5-2 5-2Zm51 2 1 4 4 1-4 1-1 4-1-4-4-1 4-1Z"
            fill="#dfbd90"
            stroke="none"
          />
          <path d={heart} transform="translate(63 44) scale(.6)" fill="#bd858a" stroke="none" />
          <circle cx="23" cy="47" r="1.5" fill="#c2ab92" stroke="none" />
        </>
      );
      break;
    case "sunset":
      drawing = (
        <>
          <path d="M22 35a18 18 0 0 1 36 0" fill="#dfbd90" />
          <path
            d="M40 8V3m-22 16-4-3m48 3 4-3M8 36h64M12 44q7-5 14 0t14 0t14 0t14 0M20 54q7-5 14 0t14 0t14 0"
            stroke="#8ca49d"
          />
          <path d="M29 25q11-11 22 0" stroke="#fff5e9" />
        </>
      );
      break;
    case "rings":
      drawing = (
        <>
          <circle cx="29" cy="39" r="16" fill="#f0e2cb" />
          <circle cx="49" cy="39" r="16" fill="#e5c9c1" fillOpacity=".55" />
          <path d="m41 14 8-7 8 7-8 9ZM41 14h16m-8-7v16" />
          <path d={heart} transform="translate(25 8) scale(.45)" fill="#bd858a" stroke="none" />
        </>
      );
      break;
    case "tulips":
      drawing = (
        <>
          <path d="M28 27 37 57m14-30L39 57m0-32v32m-8-9-12-11m24 9 15-10" stroke="#8ca49d" />
          <path
            d="m18 14 7 5 3-10 5 8 5-5c2 13-2 19-9 18-7-1-11-6-11-16Zm24-2 6 6 6-8 3 10 7-3c-2 13-7 17-14 14-6-3-9-8-8-19Z"
            fill="#e5c9c1"
          />
          <path d="m30 8 6 5 4-9 4 9 6-5c1 13-4 19-10 19S29 21 30 8Z" fill="#bd858a" />
          <path d="m31 49 14 2-4 9-9-2Z" fill="#f0e2cb" />
        </>
      );
      break;
    default:
      drawing = (
        <>
          <path d="m19 5 33 3 9 11-4 37-42-4Z" fill="#f5ecdc" />
          <path d="m52 8-1 12 10-1m-35 6 20 2m-20 5 19 2" />
          <path d="M10 33h48v26H10Z" fill="#f0e2cb" />
          <path d="m10 33 24 16 24-16M10 59l16-15m32 15L42 44" />
          <path d={heart} transform="translate(62 34) scale(.7)" fill="#bd858a" stroke="none" />
        </>
      );
  }
  return (
    <svg
      className={`note-illustration ${className}`}
      viewBox="0 0 80 64"
      fill="none"
      stroke="#796858"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawing}
    </svg>
  );
}
