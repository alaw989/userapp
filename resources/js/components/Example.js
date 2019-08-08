import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AgeChart from "./AgeChart";

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {


        axios
            .get("/api/user")
            .then(response => {
                const proxy_url = 'https://cors-anywhere.herokuapp.com/'; 
                
                console.log(response.data);
                const dateofBirth = response.data.dateofbirth.slice(6);
                const country = response.data.country;
                const currentDate = new Date;
                const age = currentDate.getFullYear() - dateofBirth
                console.log(age);
                const url = "http://54.72.28.201:80/1.0/population/" + dateofBirth + "/" + country + "/" + age + "/";
               
                return axios.get(
                    proxy_url + url
                );
            })
            .then(response => {
                console.log(response.data);
            });
    }
    render() {
        return (
            <AgeChart />
        
        )
       
        
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
