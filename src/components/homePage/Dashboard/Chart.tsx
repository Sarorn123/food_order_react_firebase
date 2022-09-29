import React from "react";
import { useThemeContext } from '../../../context/themeContext';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {};

const Chart = (props: Props) => {

    const themeContext = useThemeContext();

  const data = [
    { name: "Mon", money: 400 },
    { name: "Tue", money: 200 },
    { name: "Wen", money: 500 },
    { name: "Thur", money: 600 },
    { name: "Fri", money: 700 },
    { name: "Sat", money: 1500 },
    { name: "Sun", money: 2040 },
  ];

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 10, bottom: 0, left: -10 }}
    >
      <Line type="monotone" dataKey="money" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray=" 2" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <div className="border rounded-md py-4 px-2 overflow-auto">
      <h1 className={`bg-${themeContext?.primaryColor} ml-2 h-7 w-7 text-white flex justify-center items-center rounded-full mb-2 lg:mb-4`}>
        $
      </h1>
      {renderLineChart}
    </div>
  );
};
export default Chart;
