import "./PieGraph.css";
import React, { PureComponent } from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from "recharts";

function PieGraph({ tokens, roundData }) {
  const [pnls, setPnls] = useState([]);
  const colors = { green: "#53a76c", red: "#d0554d" };

  useEffect(() => {
    let arr = [];
    tokens.map((token) => {
      arr.push({
        name: token["info"]["token_name"],
        value: Math.abs(token.pnl),
        isGreen: token.pnl >= 0 ? true : false,
      });
    });
    setPnls(arr);
  }, [tokens]);

  function renderTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const myPayload = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <span className="custom-tooltip__name">{myPayload.name}: </span>
          <span className="custom-tooltip__value" style={{ color: myPayload.isGreen ? colors.green:colors.red}}>{!myPayload.isGreen ? "-":""}{roundData(myPayload.value)}</span>
        </div>
      );
    }
  }

  return (
    <PieChart width={331} height={331}>
      <Pie
        data={pnls}
        innerRadius={100}
        outerRadius={160}
        paddingAngle={0}
        dataKey="value"
        fill="none"
      >
        {pnls.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            stroke={entry.isGreen ? colors["green"] : colors["red"]}
            fill={entry.isGreen ? colors["green"] : colors["red"]}
          />
        ))}
      </Pie>
      <Tooltip content={renderTooltip} />
    </PieChart>
  );
}

export default PieGraph;
