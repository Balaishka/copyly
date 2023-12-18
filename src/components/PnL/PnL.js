import "./PnL.css";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import QuarterTick from "../QuarterTick/QuarterTick";

function PnL({ t, recordingData, title, data }) {
  const [pnls, setPnls] = useState([]);
  let month = 12;

  useEffect(() => {
    setPnls(recordingData(data, false));
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
    <div className="content__graph">
      <h2 className="content__graph-title">{title}</h2>
      <ResponsiveContainer height="80%">
        <BarChart
          className="graph"
          data={pnls}
          stackOffset="sign"
          maxBarSize={30}
          margin={{
            top: 0,
            right: 0,
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
          <Bar dataKey="value" name={t("value")} activeBar={{ stroke: "#ccc" }} stackId="value">
            {pnls.map((entry, index) => {
              return (
                <Cell
                  fill={entry.value < 0 ? "#d0554d" : "#53a76c"}
                  key={`cell-${index}`}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PnL;
