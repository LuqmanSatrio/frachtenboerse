import React from "react";
import set from "./freight/set"
import {VehicleSearchComponent} from "./vehicle/search"
import {VehicleSetComponent} from "./vehicle/set";
import FreightSet from "./freight/set"
import {FreightSearchComponent} from "./freight/search";
import {VehicleDetailComponent} from "./vehicle/detail";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {Container, Menu, Dropdown, Image} from "semantic-ui-react";


export default function Main() {
    return (
        <Router>
            <div>
                <Menu fixed="top" className="hello" style={{marginBottom: "20px"}}>
                    <Container>
                        <Dropdown item text='Fahrten'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="vehicleSearch">Suchen</Dropdown.Item>
                                <Dropdown.Item as={Link} to="vehicleSet">Einstellen</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown item text='Frachten'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="freightSearch">Suchen</Dropdown.Item>
                                <Dropdown.Item as={Link} to="freightSet">Einstellen</Dropdown.Item>
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
                    <img src={require('../img/logo.png')} style={{height: "50px", marginRight: "10px"}} />
                </Menu>
                <Route path="/"/>
                <Route exact path="/vehicleSearch" component={VehicleSearchComponent}/>
                <Route exact path="/vehicleSet" component={VehicleSetComponent}/>
                <Route exact path="/vehicleDetail" component={VehicleDetailComponent}/>
                <Route exact path="/freightSearch" component={FreightSearchComponent}/>
                <Route exact path="/freightSet" component={FreightSet}/>
            </div>
        </Router>
    )
}