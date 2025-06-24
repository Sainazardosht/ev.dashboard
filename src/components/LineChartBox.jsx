import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Dummy data for the chart
const data = [
  { month: "Apr", value: 20000 },
  { month: "May", value: 50000 },
  { month: "Jun", value: 42000 },
  { month: "Jul", value: 90000 },
  { month: "Aug", value: 60000 },
  { month: "Sep", value: 50000 },
  { month: "Oct", value: 58000 },
];

const LineChartComponent = () => {
  // State to track currently hovered data point index
  const [activeIndex, setActiveIndex] = useState(null);

  // Custom tooltip component to display a vertical reference line on hover
  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      const { x, y } = coordinate;
      return (
        <g>
          {/* Vertical dashed reference line */}
          <line
            x1={x}
            y1={y}
            x2={x}
            y2={500} // extend line downward to bottom of chart container
            stroke="oklch(84.6% 0.13 125)"
            strokeDasharray="4 2"
            strokeWidth={2}
          />
        </g>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={380} className="bg-zinc-800 p-3">
      <LineChart
        data={data}
        // Update activeIndex on mouse move to highlight hovered point
        onMouseMove={(e) => {
          if (e && e.activeTooltipIndex !== undefined) {
            setActiveIndex(e.activeTooltipIndex);
          }
        }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {/* X axis with custom tick rendering to highlight "May" */}
        <XAxis
          dataKey="month"
          tickLine={false}
          padding={{ left: 20, right: 20 }}
          tickMargin={15}
          tick={({ x, y, payload }) => {
            const isNow = payload.value === "May";
            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={0}
                  textAnchor="middle"
                  fill="oklch(98.5% 0 0)"
                  fontSize={12}
                >
                  {payload.value}
                </text>
                {isNow && (
                  <text
                    x={0}
                    y={0}
                    dy={13}
                    textAnchor="middle"
                    fill="oklch(44.2% 0.017 285.786)"
                    fontSize={10}
                  >
                    now
                  </text>
                )}
              </g>
            );
          }}
        />

        {/* Y axis with ticks formatted as currency */}
        <YAxis
          domain={[0, 100000]}
          ticks={[20000, 40000, 60000, 80000]}
          tickFormatter={(val) => `$${val / 1000}K`}
          tick={{ fill: "oklch(98.5% 0 0)", fontSize: 12 }}
          tickLine={false}
          tickMargin={15}
        />

        {/* Horizontal grid lines only */}
        <CartesianGrid
          vertical={false}
          horizontal={true}
          stroke="oklch(37% 0.013 285.805)"
          strokeDasharray="1 0"
        />

        {/* Reference line for May */}
        <ReferenceLine
          x="May"
          stroke="oklch(37% 0.013 285.805)"
          strokeDasharray="5 5"
        />

        {/* Dynamic reference line on hovered point */}
        {activeIndex !== null && (
          <ReferenceLine
            x={data[activeIndex].month}
            stroke="oklch(37% 0.013 285.805)"
            strokeDasharray="5 5"
          />
        )}

        {/* Tooltip with custom content, hide default cursor line */}
        <RechartsTooltip content={<CustomTooltip />} cursor={false} />

        {/* Line path with custom dots */}
        <Line
          dataKey="value"
          stroke="oklch(93.8% 0.127 124.321)"
          strokeWidth={3}
          dot={({ cx, cy, payload }) =>
            payload.month === "May" ? (
              <circle
                cx={cx}
                cy={cy}
                r={5}
                fill="oklch(27.4% 0.006 286.033)"
                stroke="oklch(84.6% 0.13 125)"
                strokeWidth={3}
              />
            ) : null
          }
          activeDot={({ cx, cy }) => (
            <circle
              cx={cx}
              cy={cy}
              r={5}
              fill="oklch(27.4% 0.006 286.033)"
              stroke="oklch(84.6% 0.13 125)"
              strokeWidth={3}
              style={{ filter: "drop-shadow(0 0 4px oklch(84.6% 0.13 125))" }}
            />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
