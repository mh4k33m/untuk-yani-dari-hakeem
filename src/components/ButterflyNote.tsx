import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const WORDS = ["you", "make", "me", "smile"];
type Flight = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
  duration: number;
  size: number;
};

function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`butterfly-drawing ${className}`}
      viewBox="0 0 80 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="butterfly-wing butterfly-wing-left">
        <path
          d="M40 34C28 7 6 2 8 22c1 14 18 17 32 12Z"
          fill="#edb7d0"
          stroke="#c783a3"
          strokeWidth="1"
        />
        <path
          d="M40 34C18 31 10 42 20 53c10 10 18-7 20-19Z"
          fill="#f6d9e6"
          stroke="#c783a3"
          strokeWidth="1"
        />
        <path
          d="M15 19c7 1 15 6 21 13m-14 12 14-9"
          stroke="#fff5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g className="butterfly-wing butterfly-wing-right">
        <path
          d="M40 34C52 7 74 2 72 22c-1 14-18 17-32 12Z"
          fill="#e8a6c3"
          stroke="#c783a3"
          strokeWidth="1"
        />
        <path
          d="M40 34c22-3 30 8 20 19-10 10-18-7-20-19Z"
          fill="#f1c9dc"
          stroke="#c783a3"
          strokeWidth="1"
        />
        <path
          d="M65 19c-7 1-15 6-21 13m14 12-14-9"
          stroke="#fff5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <path d="M40 26v19m0-17-5-7m5 7 5-7" stroke="#8a6072" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ButterflyNote() {
  const titleId = useId();
  const [count, setCount] = useState(0);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [sent, setSent] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);
  const lastBurst = useRef(-Infinity);
  const timersRef = useRef(new Set<number>());
  const complete = count === WORDS.length;

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  function tap() {
    if (!complete) {
      setCount((c) => Math.min(c + 1, WORDS.length));
      return;
    }
    const now = Date.now();
    if (now - lastBurst.current < 220) return;
    lastBurst.current = now;
    setSent(true);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const rect = buttonRef.current!.getBoundingClientRect();
    const x = Math.max(24, Math.min(window.innerWidth - 24, rect.left + rect.width / 2));
    const y = Math.max(24, Math.min(window.innerHeight - 24, rect.top + rect.height / 2));
    const burst = Array.from({ length: 4 }, (_, i) => ({
      id: nextId.current++,
      x,
      y,
      dx: window.innerWidth * (0.1 + Math.random() * 0.8) - x,
      dy: -y - 90,
      delay: i * 90,
      duration: 3800 + Math.random() * 1400,
      size: 32 + Math.random() * 22,
    }));
    setFlights((previous) => [...previous, ...burst].slice(-16));
    const ids = new Set(burst.map((b) => b.id));
    const timer = window.setTimeout(() => {
      setFlights((previous) => previous.filter((b) => !ids.has(b.id)));
      timersRef.current.delete(timer);
    }, 5600);
    timersRef.current.add(timer);
  }

  return (
    <section className="butterfly-note" aria-labelledby={titleId}>
      <div className="section-heading">
        <p className="handwritten">a little surprise</p>
        <h2 id={titleId}>One more little thing.</h2>
      </div>
      <p className="tap-words" data-testid="tap-words" aria-live="polite" aria-atomic="true">
        {WORDS.slice(0, count).map((word, i) => (
          <span key={word} className={word === "smile" ? "tap-word smile-word" : "tap-word"}>
            {i > 0 ? " " : ""}
            {word}
          </span>
        ))}
      </p>
      <button
        ref={buttonRef}
        type="button"
        className="note-button butterfly-button"
        onClick={tap}
        aria-label={complete ? "Let the butterflies fly" : "Tap for the next word"}
      >
        {complete ? "a little more ♡" : "tap, tap ♡"}
      </button>
      <p className="butterfly-hint">
        {complete ? "keep tapping, if you like." : "one word at a time."}
      </p>
      <div
        className={`resting-butterflies ${complete ? "butterflies-awake" : ""}`}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <Butterfly key={i} className="resting-butterfly" />
        ))}
      </div>
      <p className="sr-only" role="status">
        {sent ? "Butterflies, just for you." : ""}
      </p>
      {flights.length > 0 &&
        createPortal(
          <div className="butterfly-sky" aria-hidden="true">
            {flights.map((b) => (
              <span
                key={b.id}
                className="butterfly-flight"
                style={
                  {
                    left: b.x,
                    top: b.y,
                    width: b.size,
                    "--flight-x": `${b.dx}px`,
                    "--flight-y": `${b.dy}px`,
                    "--flight-delay": `${b.delay}ms`,
                    "--flight-time": `${b.duration}ms`,
                    "--wing-time": `${210 + (b.id % 4) * 35}ms`,
                  } as CSSProperties
                }
              >
                <span className="butterfly-drift">
                  <Butterfly />
                </span>
              </span>
            ))}
          </div>,
          document.body,
        )}
    </section>
  );
}
