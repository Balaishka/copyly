import "./Balance.css";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { testData } from "../../configs/constants";

function Balance({ months }) {
  const [balances, setBalances] = useState([]);
  let month = 12;

  useEffect(() => {
    let res = [];

    testData.balances.map((balance) => {
      const newDate = new Date(Number(balance.date) * 1000);
      let newDay = newDate.getDate() + " " + months[newDate.getMonth()];

      res.push({
        date: newDay,
        value: balance.value,
      });
    });

    setBalances(res);
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
    <AreaChart
      className="graph"
      width={1550}
      height={500}
      data={balances}
      margin={{
        top: 10,
        right: 50,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#315aad" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#315aad" stopOpacity={0.2} />
        </linearGradient>
      </defs>
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
      <Area
        name="Значение"
        dataKey="value"
        stroke="#315aad"
        fill="url(#gradient1)"
      />
    </AreaChart>
  );
}

export default Balance;
