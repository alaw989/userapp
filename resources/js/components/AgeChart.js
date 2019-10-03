import React, { Component, useState, useEffect } from "react";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function AgeChart() {
    const [userInfo, setInfo] = useState({
        dateofbirth: "",
        gender: "",
        age: ""
    });
    const [loading, setLoading] = useState(false);
    const [popInfo, setpopInfo] = useState([
        {
            country: "",
            pop: null,
            fpop: null
        }
    ]);

    function getData(opts) {
        setLoading(true);

        return axios
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

                if (!opts) {
                    const userData = {
                        dateofbirth: dateofBirth,
                        gender: response.data.gender,
                        age: age
                    };
                    setInfo(userData);
                }
                if (opts && opts.gender) {
                    if (opts.gender === "females") {
                        const userData = {
                            dateofbirth: dateofBirth,
                            gender: "female",
                            age: age
                        };
                        setInfo(userData);
                    }
                    if (opts.gender === "males") {
                        const userData = {
                            dateofbirth: dateofBirth,
                            gender: "male",
                            age: age
                        };
                        setInfo(userData);
                    }
                }

                return axios.get(proxy_url + url);
            })
            .then(response => {
                const dataFiltered = response.data.filter(
                    x => x.males > 500000 && x.females > 500000
                );

                if (!opts) {
                    const finalObj = dataFiltered.map(x => ({
                        country: x.country,
                        pop: x.males,
                        fpop: x.females
                    }));
                    setpopInfo(finalObj);
                }
                if (opts && opts.gender) {
                    if (opts.gender === "females") {
                        const finalObj = dataFiltered.map(x => ({
                            country: x.country,
                            pop: x.females,
                            fpop: x.males
                        }));
                        setpopInfo(finalObj);
                    } else if (opts.gender === "males") {
                        const finalObj = dataFiltered.map(x => ({
                            country: x.country,
                            pop: x.males,
                            fpop: x.females
                        }));
                        setpopInfo(finalObj);
                    }
                }

                // Done loading data

                setLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const options = [
        { value: "males", label: "Males" },
        { value: "females", label: "Females" }
    ];

    function graphRender(value, type) {
        let opts = {
            gender: null,
            country: null
        };

        if (type === "gender") {
            opts.gender = value.value;
        }

        if (type === "country") {
            opts.country = value.value;
        }

        // Ajax call
        getData(opts);
    }
    console.log(popInfo);

    function toggleHover() {
        console.log('hey')
    }
    return (
        <div className="selectgraph-container">
            <div className="select-container">
                <Select
                    options={options}
                    onChange={(value, action) => {
                        graphRender(value, "gender");
                    }}
                />
            </div>
            <div className="graph-container">
                {loading ? (
                    <div>
                        {" "}
                        <ClipLoader sizeUnit={"px"} size={150} color={"#fff"} />
                    </div>
                ) : (
                    <div className="all-wrapper">
                        <div>
                            <p>
                                Gender: {userInfo.gender} Year Born:{" "}
                                {userInfo.age}
                            </p>
                        </div>
                        {/* <LineChart
                            width={1000}
                            height={450}
                            data={popInfo}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="country" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />

                            <Line dataKey="pop" fill="#539C05" />
                        </LineChart> */}
                        <BarChart 
                            width={1100}
                            height={300}
                            data={popInfo}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                           
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="country" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip  wrapperStyle={divStyle}/>
                            

                            <Bar dataKey="fpop" stackId="a" fill="#8884d8" />
                            <Bar dataKey="pop" stackId="a" fill="#82ca9d" />
                        </BarChart>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AgeChart;

const divStyle = {
    color: 'blue',
  
  };