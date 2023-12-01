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
import { testData } from "../../configs/constants";
import QuarterTick from "../QuarterTick/QuarterTick";

function Cumulative({ recordingData }) {
  const [cum, setCum] = useState([]);
  let month = 12;

  useEffect(() => {
    setCum(recordingData(testData, "daily_pnl", true));
  }, []);

  const renderQuarterTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value } = payload;

    const arr = value.split(" ");
    let newDay = "";

    if (month !== arr[1]) {
      month = arr[1];
      newDay = `${arr[0]} ${arr[1]}`;
    } else {
      newDay = arr[0];
    }

    return <QuarterTick x={x} y={y} newDay={newDay} />;
  };

  return (
    <ComposedChart
      className="graph"
      width={1550}
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
      <Bar dataKey="value" name="Daily" activeBar={{stroke:'#ccc'}}>
        {cum.map((entry, index) => {
          return (
            <Cell
              fill={entry.value < 0 ? "#d0554d" : "#53a76c"}
              key={`cell-${index}`}
            />
          );
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
