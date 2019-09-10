import React, { Component } from "react";

const UserOverview = props => {
    console.log(props.data[0].year);
    const age = props.data[0].age;

    const country = props.data[0].country;

    return (
        <div className="overview-container">
            <div className="module">
                {" "}
                <h1>{age}</h1>
                <p>Age</p>
            </div>
            <div className="module">
                {" "}
                <h1>{country}</h1>
                <p>Country</p>
            </div>
        </div>
    );
};

export default UserOverview;
