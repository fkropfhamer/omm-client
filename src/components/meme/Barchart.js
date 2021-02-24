import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Barchart = (props) => {
  const { views, votes, comments } = props;
  console.log(props);
  const mydata = [
    { field: "views", value: views },
    { field: "comments", value: comments },
    { field: "votes", value: votes },
  ];
  return (
    <BarChart
      width={350}
      height={200}
      data={mydata}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="field" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  );
};
export default Barchart;
