import React from "react";
import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <>
      {/* Hide Navbar and Footer when 404 is active */}
      <style>{`
        header, footer {
          display: none !important;
        }
      `}</style>

      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 py-8 select-none">
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* SVG Illustration – open laptop with unplugged cables */}
          <svg
            viewBox="0 0 1000 580"
            className="w-full h-auto max-h-[70vh]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#3f3ac7" floodOpacity="0.08" />
              </filter>
              <filter id="btnShadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#f6a828" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Background blobs */}
            <path d="M 90 230 C 50 160 50 80 120 50 C 180 20 220 70 210 140 C 240 180 230 250 170 290 C 120 320 80 280 90 230 Z" fill="#EEF2FF" />
            <path d="M 30 310 C 10 240 50 170 110 180 C 150 190 160 250 140 310 C 120 360 40 370 30 310 Z" fill="#E0E7FF" opacity="0.6" />
            <path d="M 840 240 C 800 150 850 70 920 60 C 980 50 1020 120 1000 190 C 1030 250 990 330 930 350 C 870 370 820 310 840 240 Z" fill="#EEF2FF" />
            <path d="M 880 340 C 860 270 910 210 960 230 C 1000 250 1010 320 980 370 C 940 420 880 400 880 340 Z" fill="#E0E7FF" opacity="0.5" />

            {/* Ground line */}
            <line x1="0" y1="440" x2="1000" y2="440" stroke="#EEF2FF" strokeWidth="2" />

            {/* Left foliage */}
            <g transform="translate(30, 360)">
              <path d="M 15 80 C 5 50 20 20 40 10 C 50 35 45 65 35 80 Z" fill="#C7D2FE" />
              <path d="M 35 80 C 40 40 65 15 85 25 C 80 50 65 70 50 80 Z" fill="#DDD6FE" />
              <path d="M 50 80 C 65 55 90 40 105 55 C 95 70 80 80 65 80 Z" fill="#C7D2FE" />
              <path d="M 8 75 C 0 65 5 55 18 58 C 22 66 18 74 8 75 Z" fill="#A5B4FC" />
              <path d="M 55 76 C 65 68 78 72 74 80 C 66 82 58 80 55 76 Z" fill="#A5B4FC" />
            </g>

            {/* Right foliage */}
            <g transform="translate(870, 360)">
              <path d="M 75 80 C 85 50 70 20 50 10 C 40 35 45 65 55 80 Z" fill="#C7D2FE" />
              <path d="M 55 80 C 50 40 25 15 5 25 C 10 50 25 70 40 80 Z" fill="#DDD6FE" />
              <path d="M 40 80 C 25 55 0 40 -15 55 C -5 70 10 80 25 80 Z" fill="#C7D2FE" />
            </g>

            {/* Left pebbles */}
            <g transform="translate(215, 515)">
              <path d="M 0 10 C 5 2 25 0 35 6 C 45 12 40 22 30 24 C 18 26 2 22 0 10 Z" fill="#C7D2FE" />
              <path d="M 32 8 C 42 3 55 5 58 12 C 60 18 52 22 45 22 C 38 22 32 15 32 8 Z" fill="#DDD6FE" />
              <path d="M 12 12 Q 22 6 32 10" stroke="#FFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
            </g>

            {/* Right pebbles */}
            <g transform="translate(635, 520)">
              <path d="M 0 8 C 8 2 28 2 38 7 C 48 12 42 20 30 20 C 15 20 0 18 0 8 Z" fill="#C7D2FE" />
              <path d="M 36 10 C 44 4 60 5 65 11 C 70 17 62 21 54 21 C 45 21 36 17 36 10 Z" fill="#DDD6FE" />
              <path d="M 10 10 Q 20 5 30 9" stroke="#FFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
            </g>

            {/* Left cable */}
            <path d="M -10 460 C 40 460 50 240 -10 200 C -40 175 -10 135 70 135 C 135 135 170 180 190 230" fill="none" stroke="#5046E5" strokeWidth="7" strokeLinecap="round" />

            {/* Left plug (female/socket) */}
            <g transform="translate(190, 230) rotate(35)">
              <rect x="-7" y="-12" width="14" height="12" rx="4" fill="#D97706" />
              <path d="M -14 0 C -18 10 -20 22 -20 30 C -20 36 -12 40 0 40 C 12 40 20 36 20 30 C 20 22 18 10 14 0 Z" fill="#F59E0B" />
              <path d="M -16 28 C -14 14 -12 6 -6 2" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="0" cy="38" rx="20" ry="7" fill="#D97706" />
              <ellipse cx="0" cy="38" rx="18" ry="5.5" fill="#F59E0B" />
              <circle cx="-7" cy="38" r="2.8" fill="#312E81" />
              <circle cx="7" cy="38" r="2.8" fill="#312E81" />
            </g>

            {/* Right cable */}
            <path d="M 845 460 C 865 480 895 540 945 540 C 1005 540 1005 600 1030 600" fill="none" stroke="#5046E5" strokeWidth="7" strokeLinecap="round" />

            {/* Right plug (male) */}
            <g transform="translate(830, 420) rotate(-40)">
              <rect x="-9" y="-20" width="4.5" height="16" rx="2" fill="#5046E5" />
              <rect x="4.5" y="-20" width="4.5" height="16" rx="2" fill="#5046E5" />
              <ellipse cx="0" cy="-3" rx="19" ry="6" fill="#D97706" />
              <path d="M -19 -3 C -18 8 -16 22 -12 30 C -8 36 0 38 0 38 C 0 38 8 36 12 30 C 16 22 18 8 19 -3 Z" fill="#F59E0B" />
              <path d="M -14 5 C -12 16 -10 24 -6 28" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="-6" y="36" width="12" height="10" rx="3" fill="#D97706" />
            </g>

            {/* Laptop */}
            <g filter="url(#softShadow)">
              <ellipse cx="445" cy="448" rx="300" ry="8" fill="#C7D2FE" opacity="0.6" />
              <rect x="145" y="432" width="605" height="16" rx="8" fill="#9CA3AF" opacity="0.25" />
              <rect x="145" y="426" width="605" height="16" rx="8" fill="#A5B4FC" />
              <rect x="145" y="416" width="605" height="16" rx="8" fill="#C7D2FE" />
              <rect x="275" y="420" width="85" height="7" rx="3.5" fill="#EEF2FF" />
              <circle cx="518" cy="434" r="3" fill="#818CF8" />
              <circle cx="532" cy="434" r="3" fill="#818CF8" />
              <rect x="612" y="431" width="28" height="6" rx="3" fill="#818CF8" />
              <rect x="650" y="431" width="28" height="6" rx="3" fill="#818CF8" />
              <rect x="700" y="431" width="30" height="6" rx="3" fill="#818CF8" />
              <rect x="362" y="398" width="42" height="22" rx="7" fill="#818CF8" />
              <rect x="644" y="398" width="42" height="22" rx="7" fill="#818CF8" />
              <rect x="320" y="135" width="430" height="280" rx="16" fill="#FFFFFF" stroke="#4338CA" strokeWidth="18" />
            </g>

            {/* Screen content */}
            <text x="535" y="272" textAnchor="middle" fill="#4338CA" fontSize="102" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-1">404</text>
            <text x="535" y="312" textAnchor="middle" fill="#9CA3AF" fontSize="22" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">Ooops...</text>

            {/* Go back button inside screen */}
            <Link href="/">
              <g filter="url(#btnShadow)" className="cursor-pointer">
                <rect x="485" y="336" width="100" height="30" rx="15" fill="#F59E0B" />
                <text x="535" y="355.5" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Go back</text>
              </g>
            </Link>
          </svg>

          {/* Navigation buttons below */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-100 bg-white text-zinc-700 hover:text-indigo-600 hover:border-indigo-300 text-xs sm:text-sm font-medium transition-all shadow-2xs"
            >
              <Home className="w-3.5 h-3.5 text-indigo-600" />
              Homepage
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-100 bg-white text-zinc-700 hover:text-indigo-600 hover:border-indigo-300 text-xs sm:text-sm font-medium transition-all shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

