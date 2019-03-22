import React from "react";
import Header from "./Header"
import tour from "./tour"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";


export default function Main() {
    return (
        <Router>
            <div>
                <Header/>
                <Route path="/"/>
                <Route exact path="/vehicle/search" component={tour}/>
                <Route exact path="/vehicle/set" component={tour}/>
                <Route exact path="/tour/search" component={tour}/>
                <Route exact path="/tour/set" component={tour}/>
            </div>
        </Router>
    )
}