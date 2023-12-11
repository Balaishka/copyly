import "./Balance.css";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import QuarterTick from "../QuarterTick/QuarterTick";

function Balance({ recordingData, title, data }) {
  const [balances, setBalances] = useState([]);
  let month = 12;

  useEffect(() => {
    setBalances(recordingData(data, false));
  }, []);

  function renderQuarterTick(tickProps) {
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
  }

  return (
    <div className="content__graph">
      <h2 className="content__graph-title">{title}</h2>
      <ResponsiveContainer height="80%">
        <AreaChart
          className="graph"
          data={balances}
          margin={{
            top: 0,
            right: 0,
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
      </ResponsiveContainer>
    </div>
  );
}

export default Balance;
