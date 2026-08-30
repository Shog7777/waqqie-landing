import { cn } from "@/lib/utils";

/**
 * النمط 01 — شبكة ونقاط. دليل الهوية، الفصل 05:
 * شفافية منخفضة جدًا لإضافة عمق دون تشتيت الانتباه.
 * مبني بخلفية CSS + قناع تلاشٍ بدل SVG mask — أرخص بكثير على المتصفح.
 */
export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(var(--wq-gold) 1px, transparent 1px), linear-gradient(90deg, var(--wq-gold) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        opacity: 0.05,
        maskImage: "radial-gradient(85% 70% at 50% 0%, #000 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(85% 70% at 50% 0%, #000 0%, transparent 100%)",
      }}
    />
  );
}

/** النمط 02 — خريطة عقد، للرؤوس والمنشورات الرئيسية. */
export function NodePattern({ className }: { className?: string }) {
  const nodes: [number, number][] = [
    [12, 22],
    [30, 12],
    [46, 30],
    [64, 16],
    [80, 34],
    [22, 52],
    [40, 66],
    [58, 54],
    [76, 70],
    [90, 52],
  ];

  const edges: [number, number][] = [];
  nodes.forEach(([x, y], i) => {
    nodes.forEach(([x2, y2], j) => {
      if (j <= i) return;
      if (Math.hypot(x - x2, y - y2) <= 26) edges.push([i, j]);
    });
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      <g stroke="var(--wq-gold)" strokeWidth="0.1" opacity="0.16">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.32" fill="var(--wq-gold)" opacity="0.28" />
      ))}
    </svg>
  );
}

/**
 * توهج ذهبي ناعم — تدرّج شعاعي خالص بدل `filter: blur`،
 * فالتمويه على عناصر بهذا الحجم يكلّف المتصفح إعادة رسم مكلفة عند كل تمرير.
 */
export function GoldGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 22%, transparent), transparent 100%)",
      }}
    />
  );
}
