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

function SelectField() {
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

    const options = [
            {value: 'males', label: 'Males'},
            {value: 'females', label: 'Females'}
    ]

    function graphRender(e) {
        
    }

    return (
            <Select options={options} onChange={graphRender} />
    );
}

export default SelectField;
