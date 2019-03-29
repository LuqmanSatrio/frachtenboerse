import React, {Component} from "react";
import {Container, Segment, Header, Grid, Divider, Form,Input, Checkbox, Button, Dropdown, Select} from "semantic-ui-react";
import {Vehicle} from "../../../../lib/models/util"
let moment = require('moment');

type EndPoint = {
    location: string,
    date: string
}

type VehicleSearchState = {
    startingPoint: EndPoint,
    endpoints: EndPoint,
    vehicle: Vehicle
}
const vehicleOptions = [{key: "s", text: 'Sattelzug', value: 'Sattelzug'}, {
    key: "g",
    text: 'Gliederzug',
    value: 'Gliederzug'
}, {key: "k", text: 'Kleinfahrzeug', value: 'Kleinfahrzeug'}];

export class VehicleSearchComponenr extends React.Component<any, VehicleSearchState> {

    constructor(props: any) {
        super(props);

        this.state = {
            startingPoint: {
                location: "",
                date: moment().format('YYYY-MM-DD')
            },
            endpoints: {
                location: "",
                date: moment().format('YYYY-MM-DD')
            },
            vehicle: {
                vehicleType: "Sattelzug",
                weight: 0,
                length: 0,
                additionalEquipment: null
            }
        }
    }

    render() {
        return (
            <Container style={{marginTop: "80px"}}>
                <Header as='h1'>Fahrzeug suchen</Header>
                <Segment>
                    <Form>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Startpunkt</label>
                                        <input placeholder='Postleitzahl eingeben'/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Datum</label>
                                        <Input
                                            value={this.state.startingPoint.date}
                                            onChange={(e, {value}) => {
                                            this.setState({
                                            ...this.state,
                                                startingPoint: {
                                                    ...this.state.startingPoint,
                                                    date: (moment(value).format('YYYY-MM-DD'))
                                                }
                                        })}} type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Endpunkt</label>
                                        <input placeholder='Postleitzahl eingeben'/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Datum</label>
                                        <Input
                                            value={this.state.endpoints.date}
                                            onChange={(e, {value}) => {
                                            this.setState({
                                                ...this.state,
                                                endpoints: {
                                                    ...this.state.endpoints,
                                                    date: (moment(value).format('YYYY-MM-DD'))
                                                }
                                            })}}  type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Umkreis</label>
                                        <input placeholder='Umkreis eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Header as='h4'> Fahrzeugart auswählen </Header>


                                        <Form.Field
                                            control={Select}
                                            options={vehicleOptions}
                                            label={{children: 'Fahrzeugtyp'}}
                                            placeholder='Fahrzeugtyp auswählen'
                                        />

                                </Grid.Column>
                            </Grid.Row>
                            <Divider/>
                            <Grid.Row>
                                Reihe 2
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </Container>
        )
    }
}
