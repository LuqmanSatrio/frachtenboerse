import React, {Component} from "react";
import {Container, Segment, Header, Grid, Divider, Form,Input, Table, Menu, Icon, Select, Button} from "semantic-ui-react";
import {Vehicle} from "../../../../lib/models/util"
let moment = require('moment');

type EndPoint = {
    location: string,
    date: string
}

type VehicleSearchState = {
    startingPoint: EndPoint,
    endpoints: EndPoint,
    vehicle: Vehicle,
    searched: boolean
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
            },
            searched: false
        }
    }

    render() {

        const {searched} = this.state;

        let showTable = searched? "block": "none";

        let suggestedSearchResult = [{
                date: "23.12.1995",
                startingPoint: "De, Hamburg 21129",
                stopover: ["DK,FR,HU"],
                weight: 24,
                length: 7,
                vehicletype: "Sattelzug",
                price: 200.00
            },
        {
            date: "23.12.1995",
                startingPoint: "De, Hamburg 21129",
            stopover: ["DK","FR","HU"],
            weight: 24,
            length: 7,
            vehicletype:"Sattelzug",
            price: 200.00
        }].map(result => {
            return(
                <Table.Row>
                    <Table.Cell>{result.date}</Table.Cell>
                    <Table.Cell>{result.startingPoint}</Table.Cell>
                    <Table.Cell>{result.stopover.join(" ,")}</Table.Cell>
                    <Table.Cell>{result.weight + " kg"}</Table.Cell>
                    <Table.Cell>{result.length + " m"}</Table.Cell>
                    <Table.Cell>{result.vehicletype}</Table.Cell>
                    <Table.Cell>{result.price}</Table.Cell>
                </Table.Row>

            )
        });
        return (
            <Container style={{marginTop: "80px"}}>
                <Header as='h1'>Fahrzeug suchen</Header>
                <Segment>
                    <Form>
                        <Grid divided>
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
                                <Divider vertical/>
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
                                <Grid.Column width={8}>
                                    <Header as='h4'> Fahrzeugart auswählen </Header>
                                        <Form.Group
                                            style={{marginTop: "25px"}}
                                            widths={"equal"}>
                                        <Form.Field
                                    control={Select}
                                    options={vehicleOptions}
                                    label={{children: 'Fahrzeugtyp'}}
                                    placeholder='Fahrzeugtyp auswählen'
                                />
                                    <Form.Field>
                                        <label>Länge</label>
                                        <input type="number" placeholder='Länge eingeben'/>
                                    </Form.Field>
                                        </Form.Group>

                                    <Form.Group
                                        widths={"equal"}>
                                        <Form.Field>
                                            <label>Zusätzliche Ausstattung</label>
                                            <Form.Radio
                                                label='GPS'
                                                value='gps'/>
                                            <Form.Radio
                                                label='Hebebühne'
                                                value='hydraulic ramp'/>
                                            <Form.Radio
                                                label='GPS'
                                                value='gps'/>

                                        </Form.Field>
                                        <Form.Field>
                                            <label>Gewicht</label>
                                            <input type="number" placeholder='Gewicht eingeben'/>
                                        </Form.Field>
                                    </Form.Group>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider/>

                                <Button positive floated="right" style={{marginRight: "30px",marginBottom: "10px"}} type="submit" onClick={() => this.setState({
                                    ...this.state,
                                    searched: true
                                })
                                }> Suchen </Button>

                            <Grid.Row  style={{ marginRight: "10px", marginLeft: "10px",display: showTable }}>
                                <Table celled >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width={1}>Datum</Table.HeaderCell>
                                            <Table.HeaderCell width={2}>Abfahrtsort</Table.HeaderCell>
                                            <Table.HeaderCell width={2}>Zwischenstationen/Ankunftsort</Table.HeaderCell>
                                            <Table.HeaderCell width={1}>Gewicht (t)</Table.HeaderCell>
                                            <Table.HeaderCell width={1}>Länge (m)</Table.HeaderCell>
                                            <Table.HeaderCell width={1}>Fahrzeugtyp</Table.HeaderCell>
                                            <Table.HeaderCell width={1}>Vergütung in €</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {suggestedSearchResult}
                                    </Table.Body>

                                </Table>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </Container>
        )
    }
}
