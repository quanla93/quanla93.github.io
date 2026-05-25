"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const BOXES = [
  { label: "Spring", x: 8, y: 12, rotate: -7 },
  { label: "Kafka", x: 25, y: 24, rotate: 5 },
  { label: "Postgres", x: 46, y: 14, rotate: -3 },
  { label: "Redis", x: 68, y: 28, rotate: 8 },
  { label: "Docker", x: 78, y: 8, rotate: -5 },
  { label: "Tailscale", x: 12, y: 58, rotate: 6 },
  { label: "Linux", x: 36, y: 66, rotate: -8 },
  { label: "Grafana", x: 58, y: 56, rotate: 4 },
  { label: "REST", x: 76, y: 70, rotate: -4 },
  { label: "Java", x: 28, y: 44, rotate: 3 },
];

type Box = (typeof BOXES)[number];

export function PushBoxesPlayground() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const boxes = useMemo(() => BOXES, []);

  return (
    <div className="relative h-[460px] overflow-hidden rounded-3xl border border-line bg-surface/70 shadow-2xl shadow-black/5 dark:bg-surface/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_45%)]" />
      <div className="absolute left-4 top-4 z-10 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
        cursor field
      </div>
      <button
        type="button"
        onClick={() => setResetKey((key) => key + 1)}
        className="absolute right-4 top-4 z-10 rounded-full border border-line bg-background px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-foreground"
      >
        reset
      </button>

      <div ref={stageRef} className="relative size-full" key={resetKey}>
        {boxes.map((box) => (
          <PushBox key={box.label} box={box} stageRef={stageRef} />
        ))}
      </div>
    </div>
  );
}

function PushBox({ box, stageRef }: { box: Box; stageRef: React.RefObject<HTMLDivElement | null> }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(box.rotate);
  const springX = useSpring(x, { stiffness: 80, damping: 14, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 80, damping: 14, mass: 0.7 });
  const springRotate = useSpring(rotate, { stiffness: 120, damping: 18, mass: 0.6 });

  const pushFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const stage = stageRef.current;
    const element = event.currentTarget;
    if (!stage) return;

    const stageRect = stage.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = centerX - event.clientX;
    const deltaY = centerY - event.clientY;
    const distance = Math.hypot(deltaX, deltaY);
    const radius = 150;

    if (distance > radius) return;

    const force = (1 - distance / radius) * 58;
    const angle = Math.atan2(deltaY, deltaX);
    const nextX = Math.max(-stageRect.width * 0.45, Math.min(stageRect.width * 0.45, x.get() + Math.cos(angle) * force));
    const nextY = Math.max(-stageRect.height * 0.4, Math.min(stageRect.height * 0.4, y.get() + Math.sin(angle) * force));

    x.set(nextX);
    y.set(nextY);
    rotate.set(box.rotate + nextX * 0.05);
  };

  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.18}
      onPointerMove={pushFromPointer}
      style={{
        x: springX,
        y: springY,
        rotate: springRotate,
        left: `${box.x}%`,
        top: `${box.y}%`,
      }}
      whileDrag={{ scale: 1.06, zIndex: 30 }}
      className="absolute flex h-20 w-36 cursor-grab select-none items-center justify-center rounded-2xl border border-line bg-background/90 font-mono text-sm text-foreground shadow-xl shadow-black/10 backdrop-blur active:cursor-grabbing dark:bg-background/80"
    >
      <span>{box.label}</span>
    </motion.div>
  );
}
