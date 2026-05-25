"use client";

import { motion, useMotionValue, useSpring } from "motion/react";

export type FluidGradientTextProps = {
  text: string;
  svgViewBoxWidth?: number;
  svgViewBoxHeight?: number;
};

export function FluidGradientText({
  text,
  svgViewBoxWidth = 1200,
  svgViewBoxHeight = 300,
}: FluidGradientTextProps) {
  const gradientX1Raw = useMotionValue(svgViewBoxWidth / 2);
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const pointerX = event.clientX - containerRect.left;
    const normalizedX = (pointerX / containerRect.width) * svgViewBoxWidth;

    gradientX1Raw.set(Math.max(0, Math.min(svgViewBoxWidth, normalizedX)));
  };

  const handlePointerLeave = () => {
    gradientX1Raw.set(svgViewBoxWidth / 2);
  };

  return (
    <div
      className="relative size-full overflow-hidden after:absolute after:bottom-0 after:h-px after:w-full after:bg-current/15"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <svg
        className="size-full translate-y-[37.5%] select-none"
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="2"
          fill="url(#fluid-gradient-text-linear)"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: svgViewBoxHeight,
            fontWeight: 800,
            letterSpacing: "-0.08em",
          }}
        >
          {text}
        </text>
        <defs>
          <motion.linearGradient
            id="fluid-gradient-text-linear"
            x1={gradientX1}
            y1="0"
            x2={svgViewBoxWidth / 2}
            y2={svgViewBoxHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.625" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
}
