import React, { Component } from "react";
import { LineChart, Line } from 'recharts';

const AgeChart = () => {
    const list = [
        { name: "Page A", pv: 2400, amt: 2400 },
        { name: "Page B", pv: 1398, amt: 2210 },
        { name: "Page C", pv: 9800, amt: 2290 },
        { name: "Page D", pv: 3908, amt: 2000 },
        { name: "Page E", pv: 4800, amt: 2181 },
        { name: "Page F", pv: 3800, amt: 2500 },
        { name: "Page G", pv: 4300, amt: 2100 }
      ];


    return ( 
       
            <LineChart width={400} height={400} data={list}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
        
     );
}
 
export default AgeChart;    