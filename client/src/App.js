import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./app/main"

class App extends Component {


    render() {
        return (
            <Router >
                <Main/>
            </Router>
        );
    }
}

export default App;
