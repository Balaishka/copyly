import "./Сumulative.css";
import { useEffect, useState } from "react";
import {
    ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { testData2 } from "../../configs/constants";

function Cumulative({ months }) {
  const [cum, setCum] = useState([]);
  let month = 12;

  useEffect(() => {
    let res = [];

    testData2.daily_pnl.map((pnl, index) => {
      const newDate = new Date(Number(pnl.date) * 1000);
      let newDay = newDate.getDate() + " " + months[newDate.getMonth()];

      res.push({
        date: newDay,
        value: pnl.value,
        cumValue: testData2.cumulative_pnl[index].value,
      });
    });

    console.log(res);

    setCum(res);
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
    <ComposedChart
      className="graph"
      width={550}
      height={500}
      data={cum}
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
      <Bar dataKey="value" name="Daily">
        {cum.map((entry, index) => {
          return (<Cell fill={entry.value < 0 ? '#d0554d' : '#53a76c'} key={`cell-${index}`} />);
        })}
      </Bar>

      <Area
        name="Total"
        dataKey="cumValue"
        stroke="#315aad"
        fill="url(#gradient1)"
        margin={{ left: -20, right: -20 }}
      />

      {/* <Area
        name="Значение"
        dataKey="value"
        stroke="#315aad"
        fill="red"
      /> */}
    </ComposedChart>
  );
}

export default Cumulative;
