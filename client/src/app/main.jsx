import React from "react";
import tour from "./tour/tour"
import {VehicleSearchComponenr} from "./vehicle/search"
import {VehicleSetComponent} from "./vehicle/set";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {Container, Menu, Dropdown} from "semantic-ui-react";


export default function Main() {
    return (
        <Router>
            <div>
                <Menu fixed="top" className="hello" style={{marginBottom: "20px"}}>
                    <Container>
                        <Dropdown item text='Fahrzeuge'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="vehicleSearch">Suchen</Dropdown.Item>
                                <Dropdown.Item as={Link} to="vehicleSet">Einstellen</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown item text='Touren'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="tour">Suchen</Dropdown.Item>
                                <Dropdown.Item>Einstellen</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown item text='Auftragsverwaltung'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="tour">Fahrzeuge</Dropdown.Item>
                                <Dropdown.Item>Touren</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown item text='Benutzerverwaltung'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="tour">Benutzerprofil</Dropdown.Item>
                                <Dropdown.Item>Gruppen</Dropdown.Item>
                                <Dropdown.Item>Blacklist</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Menu>
                <Route path="/"/>
                <Route exact path="/vehicleSearch" component={VehicleSearchComponenr}/>
                <Route exact path="/vehicleSet" component={VehicleSetComponent}/>
                <Route exact path="/tourSerch" component={tour}/>
                <Route exact path="/tourSet" component={tour}/>
            </div>
        </Router>
    )
}