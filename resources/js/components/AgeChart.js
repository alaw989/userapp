import React, { Component, useState, useEffect } from "react";
import Select from 'react-select'
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
    const [popInfo, setpopInfo] = useState({});

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
                    females: x.females,
                    males: x.males
                }));
                console.log(finalObj);
                setpopInfo(finalObj);
            });
    }, []);

    const dateofBirth = userInfo.dateofbirth.slice(6);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dateofBirth;

    const options = [
        {value: 'chocolate', label: 'Chocolate'}
    ]

    return (
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

                <Line dataKey="males" fill="#8884d8" />
            </LineChart>
        </div>
    );
}

export default AgeChart;
