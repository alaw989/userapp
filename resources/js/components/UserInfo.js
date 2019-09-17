import React, { Component, useState, useEffect } from "react";

function UserInfo() {

    const [userinfo, setUserinfo] = useState(
        {
            name: ""
        }
    );

    useEffect(() => {
        axios.get("/api/user").then(response => {
            const name = response.data.name;

            setUserinfo(
                {
                    name: name
                }
            );
        });
    }, []);


    return ( 
        <div className="user-container">
            <img src="https://picsum.photos/150"></img>
            <h2>{userinfo.name}</h2>
        </div>
       
     );
}
 
export default UserInfo;