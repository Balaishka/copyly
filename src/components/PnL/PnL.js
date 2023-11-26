import "./PnL.css";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { testData } from "../../configs/constants";

function PnL({ months }) {
  const [pnls, setPnls] = useState([]);
  let month = 12;

  useEffect(() => {
    let res = [];

    testData.daily_pnl.map((pnl) => {
      const newDate = new Date(Number(pnl.date) * 1000);
      let newDay = newDate.getDate() + " " + months[newDate.getMonth()];

      res.push({
        date: newDay,
        value: pnl.value,
      });
    });

    console.log(res);

    setPnls(res);
  }, []);

  const renderQuarterTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value } = payload;

    const arr = value.split(" ");
    let newDay = "";

    if (month !== arr[1]) {
      month = arr[1];
      newDay = value;
    } else {
      newDay = arr[0];
    }

    return (<text
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
    </text>);
  };

  return (
    <BarChart
      className="graph"
      width={1550}
      height={500}
      data={pnls}
      margin={{
        top: 10,
        right: 50,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid
        strokeDasharray="0 0"
        vertical={false}
        stroke="rgba(255, 255, 255, 0.3)"
      />
      <XAxis
        dataKey="date"
        padding={{ left: 0, right: 0 }}
        tick={renderQuarterTick}
      />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" name="Значение">
        {pnls.map((entry, index) => {
          return (<Cell fill={entry.value < 0 ? '#d0554d' : '#53a76c'} key={`cell-${index}`} />);
        })}
      </Bar>

      {/* <Area
        name="Значение"
        dataKey="value"
        stroke="#315aad"
        fill="red"
      /> */}
    </BarChart>
  );
}

export default PnL;
