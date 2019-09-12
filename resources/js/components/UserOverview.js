import React, { Component, useState, useEffect } from "react";

function UserOverview() {
    const [[overview], setOverview] = useState({
        age: "",
        country: ""
    });

    useEffect(() => {
        axios.get("/api/user").then(response => {
            const dateofBirth = response.data.dateofbirth.slice(6);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dateofBirth;
            console.log(response.data);

            setOverview({
                age: age,
                country: response.data.country
            });
        });
    }, []);

// const modules = overview.map(x => {
//     <div className="module">
//         {x.age}
//     </div>
// });

console.log(overview);
    return (
        <div className="overview-container">
            {/* {modules} */}
        </div>
    );
}

export default UserOverview;
