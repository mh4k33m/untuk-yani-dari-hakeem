export function Tulip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 64" className={className} aria-hidden="true">
      <path d="M20 30 C20 42 20 52 20 62" stroke="var(--sea)" strokeWidth="2" fill="none" />
      <path d="M20 50 C12 46 8 40 9 34 C15 37 19 43 20 50Z" fill="var(--sea)" opacity=".55" />
      <path d="M10 10 C10 24 14 31 20 31 C26 31 30 24 30 10 L25 16 L20 6 L15 16Z" fill="var(--tulip)" />
      <path d="M20 6 L15 16 C16 24 18 30 20 31 C22 30 24 24 25 16Z" fill="var(--blush)" opacity=".7" />
    </svg>
  );
}

export function Moon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M26 4 A16 16 0 1 0 36 28 A13 13 0 1 1 26 4Z" fill="var(--paper)" />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4Z" fill="var(--paper)" />
    </svg>
  );
}

export function Waves({ className = "" }: { className?: string }) {
  const d = "M0 20 Q 50 5 100 20 T 200 20 T 300 20 T 400 20 V40 H0Z";
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="animate-wave h-10 w-[200%]">
        <path d={d} fill="var(--sea)" opacity=".35" />
        <path d={d} transform="translate(200 0)" fill="var(--sea)" opacity=".35" />
      </svg>
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="-mt-6 h-8 w-full">
        <path d="M0 22 Q 60 10 120 22 T 240 22 T 400 22 V40 H0Z" fill="var(--primary)" opacity=".25" />
      </svg>
    </div>
  );
}
