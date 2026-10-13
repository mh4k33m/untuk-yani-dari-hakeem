import { useId } from "react";

export function SeasideScene({ className = "" }: { className?: string }) {
  const uid = useId().replaceAll(":", "");
  return (
    <svg
      className={className}
      viewBox="0 0 1000 660"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="An imagined sunset by the water, with two empty chairs and pink tulips"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x2="0" y2="1">
          <stop stopColor="#bfcddc" />
          <stop offset=".5" stopColor="#eed1c6" />
          <stop offset="1" stopColor="#f4ddba" />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x2="0" y2="1">
          <stop stopColor="#95b5b5" />
          <stop offset=".48" stopColor="#7ba1a5" />
          <stop offset="1" stopColor="#527e88" />
        </linearGradient>
        <linearGradient id={`${uid}-glow`} x2="0" y2="1">
          <stop stopColor="#f5e2bf" stopOpacity=".85" />
          <stop offset="1" stopColor="#f5e2bf" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1000" height="660" fill={`url(#${uid}-sky)`} />
      <g fill="#f8efeb" opacity=".68">
        <path d="M0 108c58-24 88 14 132 5 34-8 41-35 80-27 41 8 60 31 112 24l-5 13H0Z" />
        <path d="M497 77c58-27 93 20 144 9 33-7 38-23 69-15 30 9 57 22 101 12l77 11H503Z" />
      </g>
      <path d="M115 192c54-30 80 5 123-7 50-14 81-3 132 9l77 12H64Z" fill="#b2adb9" opacity=".35" />
      <path d="M638 196c31-18 58-2 91-8 41-7 72 6 97 13l104 12H586Z" fill="#f9eee2" opacity=".8" />
      <circle cx="696" cy="262" r="57" fill="#fae5b5" opacity=".9" />
      <path
        d="M0 315c82-38 103-6 164-26 66-22 94 20 158 19 75-1 99-17 156 11v27H0Z"
        fill="#8da9ad"
        opacity=".6"
      />
      <path
        d="M705 322c60-10 76-20 119-14 67 8 124-17 176-28v66H676Z"
        fill="#849fa5"
        opacity=".5"
      />
      <rect y="328" width="1000" height="332" fill={`url(#${uid}-water)`} />
      <path d="M675 332h47l98 227H574Z" fill={`url(#${uid}-glow)`} />
      <g fill="none" stroke="#eed8bd" strokeLinecap="round" opacity=".6">
        <path
          d="M647 350h91m-99 17h113m-132 20h138m-115 23h164m-206 29h193m-175 28h181"
          strokeWidth="3"
        />
        <path
          d="M68 389h74m79 12h121m486-19h97M84 450h139m74-11h94m413 18h140"
          strokeWidth="2"
          opacity=".55"
        />
      </g>
      <path
        d="M0 505c160 17 221 51 360 60 157 10 323-4 467 24 59 12 111 36 173 40v31H0Z"
        fill="#e7d7be"
      />
      <path
        d="M0 518c151 18 217 49 359 61 150 12 321 1 457 20"
        fill="none"
        stroke="#f7ecda"
        strokeWidth="6"
        opacity=".65"
      />
      <g stroke="#776c5c" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m515 505 17 63m45-67-4 68m-52-42 61-4m-65-29 8 33m54-34 4 30m-64-29 57-3" />
        <path d="m605 507 15 65m47-71-2 69m-54-40 61-5m-63-29 6 33m53-38 5 32m-64-27 59-5" />
      </g>
      <g fill="none" stroke="#728876" strokeWidth="3" strokeLinecap="round">
        <path d="M85 660 72 550m9 77-36-39m34 15 32-37m39 94-2-87m-1 54 28-35m-29 17-21-26m767 77 12-96m-10 57 31-42" />
      </g>
      <g stroke="#748f7e" strokeWidth="3" fill="none">
        <path d="M206 660c-4-30-13-62-19-101m47 101c3-33 7-55 11-83m-48 61c-23-4-31-18-35-32m82 29c23-8 31-22 33-36" />
      </g>
      <g fill="#c98993">
        <path d="m173 533 11 8 4-14 9 13 9-11c3 24-7 34-18 32-12-2-18-13-15-28" />
        <path d="m233 558 9 7 7-12 6 13 12-5c-2 22-10 30-21 26-11-4-16-12-13-29" />
      </g>
      <g stroke="#5d7680" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6">
        <path d="M353 176q10-8 20 0 10-8 20 0m33-20q8-7 16 0 8-7 16 0" />
      </g>
    </svg>
  );
}

export function LittleBee({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 64" aria-hidden="true">
      <path
        d="M9 48c-13-13 2-27 15-13"
        fill="none"
        stroke="#afbbb1"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <ellipse cx="42" cy="22" rx="9" ry="13" fill="#d9e6e5" transform="rotate(-25 42 22)" />
      <ellipse cx="54" cy="23" rx="9" ry="13" fill="#e3ecdf" transform="rotate(27 54 23)" />
      <ellipse cx="49" cy="38" rx="20" ry="13" fill="#e4bd74" transform="rotate(-12 49 38)" />
      <path d="m40 28 5 23m7-25 5 23" stroke="#796b50" strokeWidth="5" />
      <circle cx="65" cy="32" r="2" fill="#49564a" />
      <path d="m62 25 4-7m-8 7-2-7" stroke="#796b50" strokeWidth="1.5" />
    </svg>
  );
}

export function LittleAnt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 64" aria-hidden="true">
      <path
        d="M7 52c8-8 10-5 14-2m-8-11 6-1"
        stroke="#c1b6a3"
        fill="none"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <g fill="#85766b">
        <ellipse cx="37" cy="37" rx="10" ry="8" />
        <circle cx="51" cy="33" r="5" />
        <circle cx="60" cy="27" r="7" />
      </g>
      <g stroke="#85766b" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="m45 35-4-15-8-3m13 20-12 7-3 8m17-18 1-15 7-5m-6 24 10 7 4 8m0-32 1-9m-7 12-3-8" />
      </g>
    </svg>
  );
}

export function IceCream({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 90" aria-hidden="true">
      <path d="m24 43 17 39 17-39Z" fill="#dfbd90" />
      <path d="m27 48 22 20m-18-9 13 12m9-22L34 66m-5-8 27-8" stroke="#c59d73" strokeWidth="1.5" />
      <circle cx="29" cy="34" r="15" fill="#dba3aa" />
      <circle cx="50" cy="31" r="17" fill="#f0dfc2" />
      <path
        d="M23 28c2-5 6-7 10-7m12-2c5-1 9 1 12 5"
        stroke="#fff5e9"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
