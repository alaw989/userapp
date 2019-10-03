import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AgeChart from "./AgeChart";
import UserInfo from "./UserInfo";
import UserOverview from "./UserOverview";




class Example extends Component {

    render() {
        return (
            <div className="container-fluid body-wrap">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-2 sidebar">
                        <UserInfo />
                        <div className="button-container">
                            <div className="button">Population Statistics</div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10 view"> 
                        <UserOverview  />                    
                        <AgeChart  />   
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
