import React, { Component, useState, useEffect } from "react";
import Select from "react-select";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function AgeChart() {
    const [userInfo, setInfo] = useState({
        dateofbirth: "",
        gender: ""
    });
    const [popInfo, setpopInfo] = useState({
        country: "",
        pop: "",
        fpop: ""
    });

    useEffect(() => {
        axios
            .get("/api/user")
            .then(response => {
                const proxy_url = "https://cors-anywhere.herokuapp.com/";
                const dateofBirth = response.data.dateofbirth.slice(6);
                const currentDate = new Date();
                const age = currentDate.getFullYear() - dateofBirth;
                const url =
                    "http://54.72.28.201:80/1.0/population/" +
                    dateofBirth +
                    "/" +
                    "aged" +
                    "/" +
                    age +
                    "/";

                setInfo(response.data);
                return axios.get(proxy_url + url);
            })
            .then(response => {
                const finalObj = response.data.map(x => ({
                    country: x.country,
                    pop: x.males, 
                    fpop: x.females
                }));
                setpopInfo(finalObj);
            });
    }, []);

    const dateofBirth = userInfo.dateofbirth.slice(6);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dateofBirth;

    const options = [
        { value: "males", label: "Males" },
        { value: "females", label: "Females" }
    ];

    console.log(popInfo);

    function graphRender(e) {
       if(e.value == "females") {
           const pops = pop
       }
       return pops
    }

    return (
        <div className="selectgraph-container">
            <div className="select-container">
                <Select options={options} onChange={graphRender} />
            </div>
            <div className="graph-container">
                <p>
                    Population for all {userInfo.gender}s age {age} for every
                    country
                </p>
                <LineChart
                    width={900}
                    height={300}
                    data={popInfo}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="country" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />

                    <Line dataKey="pop" fill="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
}

export default AgeChart;
