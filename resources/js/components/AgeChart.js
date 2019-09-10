import React, { Component, useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function AgeChart() {
    // const females = props.data[0].females;
    // const males = props.data[0].males;
    // const year = props.data[0].year;
    // const country = props.data[0].country;
    // const age = props.data[0].age;

    // const list = [
    //     { name: "Females", pv: females, amt: females },
    //     { name: "Males", pv: males, amt: males }
    // ];
    

    const [userInfo, setInfo] = useState();

    useEffect(() => {
        axios
        .get("/api/user")
        .then(response => {
            const proxy_url = "https://cors-anywhere.herokuapp.com/";
            const dateofBirth = response.data.dateofbirth.slice(6);
            const country = response.data.country;
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dateofBirth;
            const url =
                "http://54.72.28.201:80/1.0/population/" + dateofBirth + "/" + 'aged' + "/" + age + "/";
            
            const userInfo = response.data;
            console.log(userInfo)
            setInfo(userInfo);
            return axios.get(proxy_url + url);
        })
        .then(response => {
            const popInfo = response.data; 
            return popInfo;
        });
    });

  
    return (
        <div className="graph-container">
            {" "}
            <p onClick={() => setCount(count + 1)}></p>
            {/* <BarChart
                width={300}
                height={300}
                data={}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />

                <Bar dataKey="pv" fill="#8884d8" />
            </BarChart> */}
        </div>
    );
};

export default AgeChart;
