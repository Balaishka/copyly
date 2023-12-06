import React, { PureComponent } from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

function PieGraph({ tokens }) {
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
            fill={entry.isGreen ? colors["green"] : colors["red"]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}

export default PieGraph;
