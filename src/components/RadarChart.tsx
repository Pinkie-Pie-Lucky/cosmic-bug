import React from 'react';

interface RadarChartProps {
  scores: {
    R: number;
    A: number;
    E: number;
    I: number;
    C: number;
    U: number;
  };
}

export default function RadarChart({ scores }: RadarChartProps) {
  const cx = 150;
  const cy = 150;
  const rMax = 100;

  // 6 dimensions keys, names, and angles
  const dimensions = [
    { key: 'R', label: '现实稳定', score: Math.round(scores.R) },
    { key: 'A', label: '异常接受', score: Math.round(scores.A) },
    { key: 'E', label: '探索欲', score: Math.round(scores.E) },
    { key: 'I', label: '自我稳定', score: Math.round(scores.I) },
    { key: 'C', label: '创造力', score: Math.round(scores.C) },
    { key: 'U', label: '宇宙连通', score: Math.round(scores.U) },
  ];

  // Map index to angle (-Math.PI/2 starts at the top, rotating clockwise)
  const getCoordinates = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (index * Math.PI) / 3;
    const r = (value / 100) * rMax;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y };
  };

  // Generate web background grid (hexagons at 25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map((level) => {
    const points = dimensions.map((_, i) => {
      const { x, y } = getCoordinates(i, level);
      return `${x},${y}`;
    });
    return points.join(' ') + ' ' + points[0]; // close loop
  });

  // Generate user value path
  const userPoints = dimensions.map((d, i) => {
    const { x, y } = getCoordinates(i, d.score);
    return { x, y, label: d.label, score: d.score };
  });
  const userPathString = userPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full max-w-[320px] mx-auto flex flex-col items-center">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-auto drop-shadow-[0_0_8px_rgba(67,218,226,0.2)]"
        id="radar-svg-chart"
      >
        {/* Gradients and filters */}
        <defs>
          <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b026ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0a0a1a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43dae2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#b026ff" stopOpacity="0.45" />
          </linearGradient>
          <filter id="neon-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer background glow */}
        <circle cx={cx} cy={cy} r={rMax + 20} fill="url(#radar-glow)" />

        {/* Concentric Grid lines (Hexagons) */}
        {gridPaths.map((path, idx) => (
          <polygon
            key={idx}
            points={path}
            fill="none"
            stroke={idx === 3 ? 'rgba(67, 218, 226, 0.4)' : 'rgba(155, 139, 161, 0.15)'}
            strokeWidth="1"
            strokeDasharray={idx !== 3 ? '3 3' : 'none'}
          />
        ))}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const outerPoint = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="rgba(155, 139, 161, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled polygon for user values */}
        <polygon
          points={userPathString}
          fill="url(#poly-grad)"
          stroke="#43dae2"
          strokeWidth="2"
          filter="url(#neon-glow-filter)"
        />

        {/* Second glowing outline in purple */}
        <polygon
          points={userPathString}
          fill="none"
          stroke="#b026ff"
          strokeWidth="1"
          strokeDasharray="4 2"
        />

        {/* Data points (glowing dots) */}
        {userPoints.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="#0a0a1a"
              stroke="#43dae2"
              strokeWidth="2"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="2"
              fill="#c5cf00"
            />
          </g>
        ))}

        {/* Responsive Text Labels */}
        {dimensions.map((d, i) => {
          const outerPoint = getCoordinates(i, 118);
          // Adjust alignment anchor depending on coordinates
          let textAnchor = 'middle';
          if (outerPoint.x > cx + 10) textAnchor = 'start';
          if (outerPoint.x < cx - 10) textAnchor = 'end';

          let dy = '0.35em';
          if (outerPoint.y < cy - 10) dy = '-0.1em';
          if (outerPoint.y > cy + 10) dy = '0.85em';

          return (
            <g key={i}>
              <text
                x={outerPoint.x}
                y={outerPoint.y}
                textAnchor={textAnchor}
                dy={dy}
                fill="#43dae2"
                fontSize="11"
                fontWeight="700"
                fontFamily="Sora, sans-serif"
              >
                {d.label}
              </text>
              <text
                x={outerPoint.x}
                y={outerPoint.y + (outerPoint.y > cy ? 12 : -12)}
                textAnchor={textAnchor}
                dy={dy}
                fill="#e3e0f8"
                fontSize="10"
                fontFamily="Space Mono, monospace"
                fontWeight="bold"
              >
                {d.score}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
