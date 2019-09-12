import React, { Component, useState, useEffect } from "react";
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
    const [userInfo, setInfo] = useState({});
    const [popInfo, setpopInfo] = useState({});

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
                console.log(response.data);
                const finalObj = response.data.map(x => ({
                    country: x.country, uv: x.females, pv: x.males
                }));

                setpopInfo(finalObj);
            });     
    }, []);

    
    // const males = props.data[0].males;
     const popAge = userInfo.dateofbirth;
     const year = userInfo.year;
     const country = userInfo.country;
     const age = userInfo.age;

     console.log(popInfo);

   

    // const list = [
    //     { name: "Females", pv: females, amt: females },
    //     { name: "Males", pv: males, amt: males }
    // ];

    return (
        <div className="graph-container">
            {" "}
            <p>{popAge}</p>
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

                <Line dataKey="pv" fill="#8884d8" />
            </LineChart>
        </div>
    );
}

export default AgeChart;
