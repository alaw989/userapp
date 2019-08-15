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

const AgeChart = props => {
    const females = props.data[0].females;
    const males = props.data[0].males;
    console.log(props.data[0].females);



   

    const list = [
        { name: "Females", pv: females, amt: females },
        { name: "Males", pv: males, amt: males }
    ];

    return (
        <BarChart
            width={600}
            height={300}
            data={list}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
    );
};

export default AgeChart;
