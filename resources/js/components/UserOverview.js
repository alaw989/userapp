import React, { Component, useState, useEffect } from "react";

function UserOverview() {
    const [overview, setOverview] = useState(
        {
            age: "",
            country: ""
        }
    );

    useEffect(() => {
        axios.get("/api/user").then(response => {
            const dateofBirth = response.data.dateofbirth.slice(6);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dateofBirth;

            setOverview(
                {
                    age: age,
                    country: response.data.country
                }
            );
        });
    }, []);

    console.log(overview);


    return (
        <ul className="overview-container">
            <li className="module">
                <h1>Age</h1> 
                {overview.age}
            </li>
            <li className="module">
                <h1>Country</h1>
                {overview.country}
            </li>
        </ul>
    );
}

export default UserOverview;
