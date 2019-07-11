import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('/api/user')
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
