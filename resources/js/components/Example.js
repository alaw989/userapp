import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AgeChart from "./AgeChart";
import UserInfo from "./UserInfo";

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
                    males: 1000
                }
            ]
        };
    }

    componentDidMount() {
        axios
            .get("/api/user")
            .then(response => {
                console.log(response.data);
                const proxy_url = "https://cors-anywhere.herokuapp.com/";

                const dateofBirth = response.data.dateofbirth.slice(6);
                const country = response.data.country;
                const currentDate = new Date();
                const age = currentDate.getFullYear() - dateofBirth;

                const url =
                    "http://54.72.28.201:80/1.0/population/" + dateofBirth + "/" + country + "/" + age + "/";
                
                this.setState({
                    userInfo: response.data
                });

                return axios.get(proxy_url + url);
            })
            .then(response => {
                this.setState({
                    popInfo: response.data
                });
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <UserInfo data={this.state.userInfo} />
                    </div>
                    <div className="col-sm-9">
                        <AgeChart data={this.state.popInfo} />
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
