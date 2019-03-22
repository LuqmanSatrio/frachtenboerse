import React, { Component } from "react";
import "./App.css";
import { Menu, Container, Dropdown } from "semantic-ui-react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Main from "./app/main"

class App extends Component {
    state = {
        activeItem: ""
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem} = this.state;
        return (
            <Router >
                <Main/>
            </Router>
        );
    }
}

export default App;
