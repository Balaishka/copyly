function QuarterTick({ x, y, newDay }) {
    
    return (
        <text
          orientation="bottom"
          stroke="none"
          x={x}
          y={y}
          className="recharts-text recharts-cartesian-axis-tick-value"
          textAnchor="middle"
          fill="#666"
        >
          <tspan x={x} dy="0.71em">
            {newDay}
          </tspan>
        </text>
      );
}

export default QuarterTick;
