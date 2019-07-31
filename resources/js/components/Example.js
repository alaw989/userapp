import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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
                const age = response.data.dateofbirth.slice(6);
                const url = "http://54.72.28.201:80/1.0/population/" + age + "/Brazil/18/";
                console.log(age);
                return axios.get(
                    proxy_url + url
                );
            })
            .then(response => {
                console.log(response.data);
            });
    }
    render() {
        return <div className="card-header">Example Component</div>;
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
