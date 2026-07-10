"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

export type ScissorCutAnimationProps = {
  /** Pixel width when not fluid. Default 400. */
  size?: number;
  /** Stretch to fill the parent width (e.g. grid column). */
  fullWidth?: boolean;
  /** Seconds per blade open → close snip cycle. Default 1.4. */
  speed?: number;
  /** Seconds for one full travel along the thread. Default 6. */
  travelDuration?: number;
  /** Primary blade metal color (base steel tone). */
  bladeColor?: string;
  /** Highlight color used for the metallic gradient sheen. */
  highlightColor?: string;
  /** Thread / suture line color. */
  threadColor?: string;
  /** Spark / snip flash color. */
  sparkColor?: string;
  /** Whether the animation loops indefinitely. Default true. */
  loop?: boolean;
  /** Optional callback fired once per snip cycle (approx., via timer). */
  onSnip?: () => void;
  /** Optional caption rendered beneath the animation. */
  label?: string;
  /** Extra class name for the outer wrapper. */
  className?: string;
};

const VIEW_W = 480;
const VIEW_H = 148;
const VIEW_MIN_X = -72;
const PIVOT_X = 160;
const PIVOT_Y = 70;
const TIP_X = 124;
const TIP_Y = 70;
/** Mirrored blade-tip x in local art space (240 − 124). */
const MIRRORED_TIP_X = 116;
const SCISSOR_SCALE = 1.75;

/** Single gentle arc spanning the column. */
const THREAD_PATH = `M 10 ${VIEW_H / 2} Q ${VIEW_W / 2} ${VIEW_H / 2 - 18}, ${VIEW_W - 10} ${VIEW_H / 2 + 8}`;

/** Places mirrored blade tip at the motion-path origin. */
const SCISSOR_ALIGN = `translate(${-(MIRRORED_TIP_X * SCISSOR_SCALE)}, ${-(TIP_Y * SCISSOR_SCALE)}) scale(${SCISSOR_SCALE}) scale(-1, 1) translate(-240, 0)`;

function ScissorBlades({ uid }: { uid: string }) {
  return (
    <>
      <line
        className={`${uid}-fragment`}
        x1={TIP_X}
        y1={TIP_Y}
        x2={TIP_X + 16}
        y2={TIP_Y}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g filter={`url(#${uid}-shadow)`}>
        <g className={`${uid}-arm ${uid}-bottom`}>
          <path
            d="M205,68.5 L163,68.5 L136,69.3 L124,70 L136,70.7 L163,71.5 L205,71.5 Z"
            fill={`url(#${uid}-steel)`}
            stroke="#5b636e"
            strokeWidth="0.6"
          />
          <circle
            cx="205"
            cy="76"
            r="14"
            fill="none"
            stroke={`url(#${uid}-steel)`}
            strokeWidth="6"
          />
        </g>
        <g className={`${uid}-arm ${uid}-top`}>
          <path
            d="M205,68.5 L163,68.5 L136,69.3 L124,70 L136,70.7 L163,71.5 L205,71.5 Z"
            fill={`url(#${uid}-steel)`}
            stroke="#5b636e"
            strokeWidth="0.6"
          />
          <circle
            cx="205"
            cy="64"
            r="14"
            fill="none"
            stroke={`url(#${uid}-steel)`}
            strokeWidth="6"
          />
        </g>
        <circle cx={PIVOT_X} cy={PIVOT_Y} r="4.2" fill="#4a515a" />
        <circle cx={PIVOT_X - 1} cy={PIVOT_Y - 1} r="1.3" fill="#c9cfd6" />
      </g>
      <circle
        className={`${uid}-spark`}
        cx={TIP_X + 12}
        cy={TIP_Y}
        r="9"
        fill={`url(#${uid}-spark-grad)`}
      />
    </>
  );
}

/**
 * Surgical-scissor cutting animation — scissors travel along a simple curved dashed thread.
 */
export function ScissorCutAnimation({
  size = 400,
  fullWidth = false,
  speed = 1.4,
  travelDuration = 6,
  bladeColor = "#aab2bd",
  highlightColor = "#f3f5f7",
  threadColor = "#5b8a9a",
  sparkColor = "#fff7d6",
  loop = true,
  onSnip,
  label,
  className = "",
}: ScissorCutAnimationProps) {
  const rawId = useId().replace(/[:]/g, "");
  const uid = `scsr-${rawId}`;
  const snipCbRef = useRef(onSnip);

  useEffect(() => {
    snipCbRef.current = onSnip;
  }, [onSnip]);

  useEffect(() => {
    if (!onSnip) return;
    const ms = speed * 1000;
    const id = window.setInterval(() => {
      snipCbRef.current?.();
    }, ms);
    return () => window.clearInterval(id);
  }, [speed, onSnip]);

  const iterationCount = loop ? "infinite" : "1";
  const motionRepeat = loop ? "indefinite" : "1";

  return (
    <div
      className={cn(`${uid}-wrap`, className)}
      style={{
        width: fullWidth ? "100%" : size,
        aspectRatio: `${VIEW_W - VIEW_MIN_X} / ${VIEW_H}`,
        display: "block",
      }}
    >
      <style>{`
        .${uid}-wrap {
          position: relative;
          line-height: 0;
        }
        .${uid}-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .${uid}-scissor-body {
          color: ${threadColor};
        }
        .${uid}-arm {
          transform-box: view-box;
          transform-origin: ${PIVOT_X}px ${PIVOT_Y}px;
          animation-duration: ${speed}s;
          animation-timing-function: cubic-bezier(.61,.02,.32,1);
          animation-iteration-count: ${iterationCount};
        }
        .${uid}-top {
          animation-name: ${uid}-top-kf;
        }
        .${uid}-bottom {
          animation-name: ${uid}-bottom-kf;
        }
        .${uid}-spark {
          transform-box: view-box;
          transform-origin: ${TIP_X + 12}px ${TIP_Y}px;
          animation: ${uid}-spark-kf ${speed}s ${iterationCount};
          animation-timing-function: ease-out;
        }
        .${uid}-fragment {
          transform-box: view-box;
          transform-origin: ${TIP_X + 8}px ${TIP_Y + 4}px;
          animation: ${uid}-fragment-kf ${speed}s ${iterationCount};
          animation-timing-function: ease-in;
        }
        .${uid}-thread {
          stroke-dasharray: 7 6;
        }
        .${uid}-static {
          display: none;
        }

        @keyframes ${uid}-top-kf {
          0%, 30%  { transform: rotate(-13deg); }
          42%      { transform: rotate(0deg); }
          54%, 100% { transform: rotate(-13deg); }
        }
        @keyframes ${uid}-bottom-kf {
          0%, 30%  { transform: rotate(13deg); }
          42%      { transform: rotate(0deg); }
          54%, 100% { transform: rotate(13deg); }
        }
        @keyframes ${uid}-spark-kf {
          0%, 36%   { opacity: 0; transform: scale(0.4); }
          42%       { opacity: 1; transform: scale(1.15); }
          52%, 100% { opacity: 0; transform: scale(0.6); }
        }
        @keyframes ${uid}-fragment-kf {
          0%, 38%   { opacity: 0; transform: translate(0, 0); }
          42%       { opacity: 1; transform: translate(0, 0); }
          58%       { opacity: 0.85; transform: translate(4px, 10px) rotate(25deg); }
          72%, 100% { opacity: 0; transform: translate(6px, 18px) rotate(35deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .${uid}-motion { display: none; }
          .${uid}-static { display: block; }
          .${uid}-arm, .${uid}-spark, .${uid}-fragment {
            animation: none !important;
          }
          .${uid}-top { transform: rotate(-13deg); }
          .${uid}-bottom { transform: rotate(13deg); }
        }
      `}</style>

      <svg
        className={`${uid}-svg`}
        viewBox={`${VIEW_MIN_X} 0 ${VIEW_W - VIEW_MIN_X} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={label ?? "Scissor cutting along a curved suture thread"}
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <linearGradient id={`${uid}-steel`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="45%" stopColor={bladeColor} />
            <stop offset="100%" stopColor="#7c8794" />
          </linearGradient>
          <radialGradient id={`${uid}-spark-grad`}>
            <stop offset="0%" stopColor={sparkColor} stopOpacity="1" />
            <stop offset="100%" stopColor={sparkColor} stopOpacity="0" />
          </radialGradient>
          <filter
            id={`${uid}-shadow`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.4"
              floodColor="#1b1f24"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        <path
          id={`${uid}-thread`}
          className={`${uid}-thread`}
          d={THREAD_PATH}
          fill="none"
          stroke={threadColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Scissors loop along the thread */}
        <g className={`${uid}-motion`}>
          <animateMotion
            dur={`${travelDuration}s`}
            repeatCount={motionRepeat}
            rotate="auto"
            calcMode="linear"
          >
            <mpath href={`#${uid}-thread`} />
          </animateMotion>

          <g className={`${uid}-scissor-body`} transform={SCISSOR_ALIGN}>
            <ScissorBlades uid={uid} />
          </g>
        </g>

        {/* Static fallback for reduced motion */}
        <g className={`${uid}-static`}>
          <g className={`${uid}-scissor-body`} transform={`translate(12, ${VIEW_H / 2}) ${SCISSOR_ALIGN}`}>
            <ScissorBlades uid={uid} />
          </g>
        </g>
      </svg>

      {label && (
        <div className="mt-1.5 text-center font-body text-xs text-ink-muted">
          {label}
        </div>
      )}
    </div>
  );
}

/** @deprecated Use `ScissorCutAnimation` — kept for existing imports. */
export const ScissorCut = ScissorCutAnimation;
