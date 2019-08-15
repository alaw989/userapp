import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AgeChart from "./AgeChart";

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo : [
                {
                    females : 1000,
                    males : 1000
                }
            ]
        }
    }
    

    componentDidMount() {
        console.log(this.state.userInfo);
        axios
            .get("/api/user")
            .then(response => {
                const proxy_url = 'https://cors-anywhere.herokuapp.com/'; 
            
                const dateofBirth = response.data.dateofbirth.slice(6);
                const country = response.data.country;
                const currentDate = new Date;
                const age = currentDate.getFullYear() - dateofBirth
                
                const url = "http://54.72.28.201:80/1.0/population/" + dateofBirth + "/" + country + "/" + age + "/";
               
                return axios.get(
                    proxy_url + url
                );
            })
            .then(response => {
                this.setState({
                    userInfo : response.data
                });
            });
    }
    render() {
        return (
            <AgeChart data={this.state.userInfo} />
        )
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
