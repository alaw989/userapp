import React, { Component } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const WorldChart = props => {
    const females = props.data[0].females;
    const males = props.data[0].males;
    const year = props.data[0].year;
    const country = props.data[0].country;
    const age = props.data[0].age;

    const list = [
        { name: "Females", pv: females, amt: females },
        { name: "Males", pv: males, amt: males }
    ];

    return (
        <div className="graph-container">
            {" "}
            <p>
                {country} population (male vs. female) in {year} for all people
                age {age}
            </p>
            <LineChart
                width={300}
                height={300}
                data={list}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />

                <Line dataKey="pv" fill="#8884d8" />
            </LineChart>
        </div>
    );
};

export default WorldChart;
