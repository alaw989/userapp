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
                console.log(response.data);
                return axios.get(
                    "http://54.72.28.201:80/1.0/population/1980/Brazil/18/"
                );
            })
            .then(response => {
                console.log(response);
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
