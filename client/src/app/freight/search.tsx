import React, {Component} from "react";
import {Container, Segment, Header, Grid, Divider, Form, Input, Table, Radio, Select, Button} from "semantic-ui-react";
import {Vehicle, VehicleType} from "../../../../lib/models/util"

let moment = require('moment');
import {Api} from "../../api";
import * as request from "request";

const api: Api = new Api();

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

export class FreightSearchComponent extends React.Component<any, VehicleSearchState> {

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
                additionalEquipment: []
            },
            searched: false
        }
    }

    async getApi() {
        try {
            let result = await api.getFreight();
        } catch (e) {
            console.log("err")
        }
    }

    handleAdditionalEquipmentChange(value: string) {
        if (this.state.vehicle.additionalEquipment.includes(value)) {
            this.setState({
                ...this.state,
                vehicle: {
                    ...this.state.vehicle,
                    additionalEquipment: this.state.vehicle.additionalEquipment.filter(item => item !== value)
                }

            });
            console.log(this.state.vehicle.additionalEquipment);
            console.log(this.state.vehicle.additionalEquipment.includes(value))
        } else {
            this.setState({
                ...this.state,
                vehicle: {
                    ...this.state.vehicle,
                    additionalEquipment: [...this.state.vehicle.additionalEquipment, value]
                }
            })
            console.log(this.state.vehicle.additionalEquipment);
            console.log(this.state.vehicle.additionalEquipment.includes(value))
        }

    }

    render() {

        const {searched} = this.state;

        let showTable = searched ? "block" : "none";

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
                stopover: ["DK", "FR", "HU"],
                weight: 24,
                length: 7,
                vehicletype: "Sattelzug",
                price: 200.00
            }].map(result => {
            return (
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
                <Header as='h1'>Fracht suchen</Header>
                <Segment>
                    <Form>
                        <Grid divided>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Startpunkt</label>
                                        <Input type='number' value={this.state.startingPoint.location}
                                               onChange={(e, {value}) => this.setState({
                                                   ...this.state,
                                                   startingPoint: {
                                                       ...this.state.startingPoint,
                                                       location: value
                                                   }
                                               })
                                               } placeholder='Postleitzahl eingeben'/>
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
                                                })
                                            }} type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Divider vertical/>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Endpunkt</label>
                                        <Input type='number' placeholder='Postleitzahl eingeben'
                                               onChange={(e, {value}) => {
                                                   this.setState({
                                                       ...this.state,
                                                       endpoints: {
                                                           ...this.state.endpoints,
                                                           location: value
                                                       }
                                                   })

                                               }}/>
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
                                                })
                                            }} type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as='h4'> Fahrzeugart auswählen </Header>
                                    <Form.Group
                                        style={{marginTop: "25px"}}
                                        widths={"equal"}>
                                        <Form.Field>
                                            <label>Fahrzeugtyp</label>
                                            <Select
                                                options={vehicleOptions}
                                                placeholder='Fahrzeugtyp auswählen'
                                                onChange={(e, {value}) => this.setState({
                                                    ...this.state,
                                                    vehicle: {
                                                        ...this.state.vehicle,
                                                        vehicleType: value as VehicleType
                                                    }
                                                })}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Länge</label>
                                            <Input type='number' placeholder='Länge eingeben'
                                                   onChange={(e, {value}) => {
                                                       this.setState({
                                                           ...this.state,
                                                           vehicle: {
                                                               ...this.state.vehicle,
                                                               length: 1
                                                           }
                                                       })
                                                   }}/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group
                                        widths={"equal"}>
                                        <Form.Field>
                                            <label>Zusätzliche Ausstattung</label>
                                            <Form.Checkbox
                                                label='GPS Ortung'
                                                value='gps'
                                                checked={this.state.vehicle.additionalEquipment.includes('gps')}
                                                onClick={(e, value) => this.handleAdditionalEquipmentChange(value.value as string)}/>
                                            <Form.Checkbox
                                                label='Hebebühne'
                                                value='hydraulicRamp'
                                                checked={this.state.vehicle.additionalEquipment.includes('hydraulicRamp')}
                                                onChange={(e, value) => this.handleAdditionalEquipmentChange(value.value as string)}/>

                                        </Form.Field>
                                        <Form.Field>
                                            <label>Gewicht</label>
                                            <input type="number" placeholder='Gewicht eingeben'/>
                                        </Form.Field>
                                    </Form.Group>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider/>

                            <Button positive floated="right" style={{marginRight: "30px", marginBottom: "10px"}}
                                    type="submit" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    searched: true
                                });
                                this.getApi();
                            }
                            }> Suchen </Button>

                            <Grid.Row style={{marginRight: "10px", marginLeft: "10px", display: showTable}}>
                                <Table celled>
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
