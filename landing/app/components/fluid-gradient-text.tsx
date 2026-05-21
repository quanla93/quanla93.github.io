import { useId } from "react";

type Props = {
  text: string;
  /** SVG viewBox width — keep wide enough to contain the text. Default 1800. */
  svgViewBoxWidth?: number;
  /** SVG viewBox height — sets the vertical "letter box". Default 280. */
  svgViewBoxHeight?: number;
  /** Tailwind classes applied to the outermost wrapper. */
  className?: string;
  /** Outline stroke width (in viewBox units). Default 2. */
  strokeWidth?: number;
};

/**
 * Static signature text in the style of chanhdai.com:
 *   - Two stacked <text> layers in an SVG.
 *   - Fill layer uses a vertical linear gradient that fades from transparent
 *     at the top to solid foreground at the bottom (only the lower portion
 *     of each glyph is visible).
 *   - Outline layer at low opacity is always on, so the full letter shapes
 *     remain readable as a faint wireframe.
 *   - Outer wrapper has overflow-hidden + an inner translate-y-[37.5%] which
 *     crops the bottom of the SVG, making the letters look like they "rise
 *     out of the page" — only their upper portions are visible.
 *
 * Pair with the Pixelify Sans font (--font-pixel) for the chanhdai look.
 */
export function FluidGradientText({
  text,
  svgViewBoxWidth = 1800,
  svgViewBoxHeight = 280,
  className = "",
  strokeWidth = 2,
}: Props) {
  const gradId = useId();
  const fontSize = svgViewBoxHeight * 1.1;
  const baselineY = svgViewBoxHeight * 0.95;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-full translate-y-[37.5%] items-center justify-center">
        <svg
          viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
          className="block w-full"
          fill="none"
          role="img"
          aria-label={text}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`grad-${gradId}`}
              x1={svgViewBoxWidth / 2}
              y1="1"
              x2={svgViewBoxWidth / 2}
              y2={svgViewBoxHeight}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.625" stopColor="var(--foreground)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--foreground)" />
            </linearGradient>
          </defs>

          {/* Fill: vertical fade from transparent (top) to foreground (bottom) */}
          <text
            x="50%"
            y={baselineY}
            fontSize={fontSize}
            fontWeight={500}
            textAnchor="middle"
            className="font-pixel"
            fill={`url(#grad-${gradId})`}
          >
            {text}
          </text>

          {/* Outline: always visible at low opacity (var(--foreground) at 10%) */}
          <text
            x="50%"
            y={baselineY}
            fontSize={fontSize}
            fontWeight={500}
            textAnchor="middle"
            className="font-pixel stroke-foreground/10"
            fill="none"
            strokeWidth={strokeWidth}
          >
            {text}
          </text>
        </svg>
      </div>
    </div>
  );
}
