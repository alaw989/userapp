import React, { Component, useState, useEffect } from "react";
import CountryFlag from "./CountryFlag";

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

    return (
        <ul className="overview-container">
            <li className="module">
                <p>Age: {overview.age}</p> 
                
            </li>
            <li className="module">
                <p>Country:</p>
                <CountryFlag/>
            </li>
        </ul>
    );
}

export default UserOverview;
