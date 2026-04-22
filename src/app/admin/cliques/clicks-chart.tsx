"use client"

interface Point {
  label: string
  value: number
}

export function ClicksChart({ data }: { data: Point[] }) {
  if (data.length === 0) return null
  const max = Math.max(1, ...data.map((d) => d.value))
  const width = 600
  const height = 180
  const pad = { top: 16, right: 16, bottom: 28, left: 32 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0

  const points = data.map((d, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + innerH - (d.value / max) * innerH,
    label: d.label,
    value: d.value,
  }))

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")

  const areaPath =
    points.length > 0
      ? `${path} L${points[points.length - 1].x.toFixed(1)},${(pad.top + innerH).toFixed(
          1
        )} L${points[0].x.toFixed(1)},${(pad.top + innerH).toFixed(1)} Z`
      : ""

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Histórico de cliques mensais"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9b6c4a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#9b6c4a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad.left}
            x2={width - pad.right}
            y1={pad.top + innerH * t}
            y2={pad.top + innerH * t}
            stroke="#eee"
            strokeDasharray="2 3"
          />
        ))}

        <path d={areaPath} fill="url(#chartGrad)" />
        <path d={path} fill="none" stroke="#9b6c4a" strokeWidth="2" />

        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#9b6c4a" />
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#2e2e2e"
            >
              {p.value}
            </text>
            <text
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#2e2e2e99"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
