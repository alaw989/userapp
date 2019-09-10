import React, { Component } from "react";

const UserInfo = (props) => {

const name = props.data.name;


    return ( 
        <div className="user-container">
            <img src="https://picsum.photos/150"></img>
            <h2>{name}</h2>
        </div>
       
     );
}
 
export default UserInfo;