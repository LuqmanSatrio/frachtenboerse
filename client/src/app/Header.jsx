import {Container, Menu, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import React from "react";

export default function(){
    return(
        <Menu fixed="top" className="hello" style={{marginBottom: "20px"}}>
            <Container>
                <Dropdown item text='Fahrzeuge'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="tour">Suchen</Dropdown.Item>
                        <Dropdown.Item>Einstellen</Dropdown.Item>
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
    )
}