"use client"

import { useMemo, useState } from "react"

interface Series {
  key: string
  label: string
  values: number[]
}

interface Props {
  months: string[]
  series: Series[]
  totals: number[]
}

const PALETTE = [
  "#9b6c4a",
  "#00A5D6",
  "#FFB800",
  "#C08A63",
  "#2E8B57",
  "#8E44AD",
  "#E74C3C",
  "#34495E",
  "#16A085",
  "#D35400",
]

export function ClicksChart({ months, series, totals }: Props) {
  const [mode, setMode] = useState<"total" | "breakdown">("total")
  const [active, setActive] = useState<Set<string>>(
    () => new Set(series.slice(0, 5).map((s) => s.key))
  )

  const colorByKey = useMemo(() => {
    const m = new Map<string, string>()
    series.forEach((s, i) => m.set(s.key, PALETTE[i % PALETTE.length]))
    return m
  }, [series])

  function toggle(k: string) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  }

  const activeSeries = useMemo(
    () =>
      mode === "total"
        ? [{ key: "__total__", label: "Total", values: totals }]
        : series.filter((s) => active.has(s.key)),
    [mode, series, totals, active]
  )

  const width = 640
  const height = 220
  const pad = { top: 20, right: 16, bottom: 32, left: 36 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const stepX = months.length > 1 ? innerW / (months.length - 1) : 0

  const allValues = activeSeries.flatMap((s) => s.values)
  const max = Math.max(1, ...allValues)

  const yTicks = 4
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max * (yTicks - i)) / yTicks)
  )

  function pointsFor(values: number[]) {
    return values.map((v, i) => ({
      x: pad.left + i * stepX,
      y: pad.top + innerH - (v / max) * innerH,
      v,
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-neutral-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setMode("total")}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              mode === "total"
                ? "bg-marrom text-white"
                : "bg-white text-charcoal/70 hover:bg-neutral-50"
            }`}
          >
            Total
          </button>
          <button
            type="button"
            onClick={() => setMode("breakdown")}
            className={`px-3 py-1.5 text-xs font-bold transition-colors border-l border-neutral-200 ${
              mode === "breakdown"
                ? "bg-marrom text-white"
                : "bg-white text-charcoal/70 hover:bg-neutral-50"
            }`}
          >
            Por CTA
          </button>
        </div>
        {mode === "breakdown" && series.length > 0 && (
          <>
            <span className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/40">
              Filtrar
            </span>
            {series.map((s) => {
              const on = active.has(s.key)
              const color = colorByKey.get(s.key) ?? "#9b6c4a"
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggle(s.key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors border ${
                    on
                      ? "bg-white text-charcoal border-neutral-300"
                      : "bg-neutral-50 text-charcoal/40 border-transparent hover:bg-neutral-100"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: on ? color : "#d4d4d4" }}
                  />
                  {s.label}
                </button>
              )
            })}
          </>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
          aria-label="Histórico de cliques mensais"
        >
          {tickValues.map((v, i) => {
            const y = pad.top + (innerH * i) / yTicks
            return (
              <g key={i}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={y}
                  y2={y}
                  stroke="#eee"
                  strokeDasharray="2 3"
                />
                <text
                  x={pad.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#2e2e2e80"
                >
                  {v}
                </text>
              </g>
            )
          })}

          {months.map((m, i) => (
            <text
              key={m + i}
              x={pad.left + i * stepX}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#2e2e2e99"
            >
              {m}
            </text>
          ))}

          {activeSeries.map((s) => {
            const pts = pointsFor(s.values)
            const path = pts
              .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
              .join(" ")
            const color =
              s.key === "__total__" ? "#9b6c4a" : colorByKey.get(s.key) ?? "#9b6c4a"

            return (
              <g key={s.key}>
                {mode === "total" && (
                  <>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${path} L${pts[pts.length - 1].x.toFixed(1)},${(
                        pad.top + innerH
                      ).toFixed(1)} L${pts[0].x.toFixed(1)},${(pad.top + innerH).toFixed(
                        1
                      )} Z`}
                      fill="url(#chartGrad)"
                    />
                  </>
                )}
                <path d={path} fill="none" stroke={color} strokeWidth="2" />
                {pts.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="3" fill={color} />
                    {mode === "total" && (
                      <text
                        x={p.x}
                        y={p.y - 8}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#2e2e2e"
                      >
                        {p.v}
                      </text>
                    )}
                  </g>
                ))}
              </g>
            )
          })}

          {mode === "breakdown" && activeSeries.length === 0 && (
            <text
              x={width / 2}
              y={height / 2}
              textAnchor="middle"
              fontSize="12"
              fill="#2e2e2e60"
            >
              Selecione ao menos 1 CTA
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
