import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AgeChart from "./AgeChart";
import UserInfo from "./UserInfo";
import UserOverview from "./UserOverview";



class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: [
                {
                    name: "Username"
                }
            ],
            popInfo: [
                {
                    females: 1000,
                    males: 1000,
                    year: 1987
                }
            ]
        };
    }

    componentDidMount() {

    }
    render() {
        return (
            <div className="container-fluid body-wrap">
                <div className="row">
                    <div className="col-sm-2 sidebar">
                        <UserInfo data={this.state.userInfo} />
                        <div className="button-container">
                            <div className="button">Population Statistics</div>
                        </div>
                    </div>
                    <div className="col-sm-10 view"> 
                        <UserOverview data={this.state.popInfo} />
                        {/* <WorldChart data={this.state.popInfo} /> */}                       
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
