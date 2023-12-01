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
import QuarterTick from "../QuarterTick/QuarterTick";

function Balance({ recordingData }) {
  const [balances, setBalances] = useState([]);
  let month = 12;

  useEffect(() => {
    setBalances(recordingData(testData, "balances", false));
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
