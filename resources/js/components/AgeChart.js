import React, { Component } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { PieChart, Pie } from "recharts";

const AgeChart = props => {
    const females = props.data[0].females;
    const males = props.data[0].males;


    const list = [
        { name: "Females", pv: females, amt: females },
        { name: "Males", pv: males, amt: males }
    ];

    const data01 = [
        { name: "Males", value: males },
        { name: "Females", value: females }
    ];

    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Tooltip />
        </PieChart>
    );
};

export default AgeChart;
