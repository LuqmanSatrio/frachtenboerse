import React, {Component} from "react";
import {
    Container,
    Segment,
    Header,
    Grid,
    Divider,
    Form,
    Input,
    Table,
    Radio,
    Select,
    Button,
    Dropdown
} from "semantic-ui-react";
import {countryOptions, Vehicle, VehicleType, EndPoint} from "../../lib/models/util"
import {Api} from "../../api"

const moment = require('moment');

const api = new Api();


type VehicleSearchState = {
    startingPoint: EndPoint,
    endPoint: EndPoint,
    vehicle: Vehicle,
    searched: boolean,
    result: any[]
}
const vehicleOptions = [{key: "s", text: 'Sattelzug', value: 'Sattelzug'}, {
    key: "g",
    text: 'Gliederzug',
    value: 'Gliederzug'
}, {key: "k", text: 'Kleinfahrzeug', value: 'Kleinfahrzeug'}];

export class VehicleSearchComponent extends React.Component<any, VehicleSearchState> {

    constructor(props: any) {
        super(props);

        this.state = {
            startingPoint: {
                address: {
                    street: ""
                },
                date: this.setTimeTo12(new Date()).getTime()
            },
            endPoint: {
                address: {
                    street: ""
                },
                date: this.setTimeTo12(new Date()).getTime()
            },
            vehicle: {
                vehicleType: "Sattelzug",
                weight: 0,
                length: 0,
                additionalEquipment: []
            },
            searched: false,
            result: []
        }
    }

    async searchTour() {
        this.setState({searched: true});
        try {
            const result = await api.getTour({
                startingPoint: this.state.startingPoint,
                endPoint: this.state.endPoint,
                vehicle: this.state.vehicle
            });
            console.log(result);
            this.setState({result: result})

        } catch (e) {
            console.log(e)
        }

        this.setState({searched: true});
    }

    setTimeTo12(date: Date) {
        date.setHours(12, 0, 0, 0);
        return (date)
    }


    handleAdditionalEquipmentChange(value: string) {
        if (this.state.vehicle.additionalEquipment.includes(value)) {
            this.setState({
                ...this.state,
                vehicle: {
                    ...this.state.vehicle,
                    additionalEquipment: this.state.vehicle.additionalEquipment.filter(item => item !== value)
                }

            })
        } else {
            this.setState({
                ...this.state,
                vehicle: {
                    ...this.state.vehicle,
                    additionalEquipment: [...this.state.vehicle.additionalEquipment, value]
                }
            });
        }

    }

    render() {

        const {searched} = this.state;

        let showTable = searched ? "block" : "none";

        let suggestedSearchResult = this.state.result.map((result, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{result.date}</Table.Cell>
                    <Table.Cell>{result.startingPoint}</Table.Cell>
                    <Table.Cell>{result.stopover.join(" ,")}</Table.Cell>
                    <Table.Cell>{result.weight + " kg"}</Table.Cell>
                    <Table.Cell>{result.length + " m"}</Table.Cell>
                    <Table.Cell> {result.vehicletype} </Table.Cell>
                </Table.Row>

            )
        });

        return (
            <Container style={{marginTop: "80px"}}>
                <Header as='h1'>Fahrt suchen</Header>
                <Segment>
                    <Form>
                        <Grid divided>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Stadt</label>
                                        <Input value={this.state.startingPoint.address.city}
                                               onChange={(e, {value}) => {
                                                   this.setState({
                                                       ...this.state,
                                                       startingPoint: {
                                                           ...this.state.startingPoint,
                                                           address: {
                                                               ...this.state.startingPoint.address,
                                                               city: value
                                                           }
                                                       }
                                                   });
                                               }
                                               } placeholder='Stadt eingeben'/>
                                    </Form.Field>
                                    <Form.Group>
                                        <Form.Field width={10}>
                                            <label>Postleitzahl</label>
                                            <Input type='number' value={this.state.startingPoint.address.postcode}
                                                   onChange={(e, {value}) => this.setState({
                                                       ...this.state,
                                                       startingPoint: {
                                                           ...this.state.startingPoint,
                                                           address: {
                                                               ...this.state.startingPoint.address,
                                                               postcode: value
                                                           }
                                                       }
                                                   })
                                                   }/>
                                        </Form.Field>
                                        <Form.Field width={14}>
                                            <label>Land</label>
                                            <Dropdown fluid
                                                      selection value={this.state.startingPoint.address.country}
                                                      options={countryOptions}
                                                      onChange={(e, {value}) => this.setState({
                                                          ...this.state,
                                                          startingPoint: {
                                                              ...this.state.startingPoint,
                                                              address: {
                                                                  ...this.state.startingPoint.address,
                                                                  country: value as string
                                                              }
                                                          }
                                                      })
                                                      }/>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Field>
                                        <label>Datum</label>
                                        <Input
                                            value={moment(new Date(this.state.startingPoint.date)).format('YYYY-MM-DD')}
                                            onChange={(e, {value}) => {
                                                this.setState({
                                                    ...this.state,
                                                    startingPoint: {
                                                        ...this.state.startingPoint,
                                                        date: this.setTimeTo12(new Date(value)).getTime()
                                                    }
                                                })
                                            }} type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Divider vertical/>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Stadt</label>
                                        <Input value={this.state.endPoint.address.city}
                                               onChange={(e, {value}) => this.setState({
                                                   ...this.state,
                                                   endPoint: {
                                                       ...this.state.endPoint,
                                                       address: {
                                                           ...this.state.endPoint.address,
                                                           city: value
                                                       }
                                                   }
                                               })
                                               } placeholder='Stadt eingeben'/>
                                    </Form.Field>
                                    <Form.Group>
                                        <Form.Field width={10}>
                                            <label>Postleitzahl</label>
                                            <Input type='number' value={this.state.endPoint.address.postcode}
                                                   onChange={(e, {value}) => this.setState({
                                                       ...this.state,
                                                       endPoint: {
                                                           ...this.state.endPoint,
                                                           address: {
                                                               ...this.state.endPoint.address,
                                                               postcode: value
                                                           }
                                                       }
                                                   })
                                                   }/>
                                        </Form.Field>
                                        <Form.Field width={14}>
                                            <label>Land</label>
                                            <Dropdown fluid
                                                      selection value={this.state.endPoint.address.country}
                                                      options={countryOptions}
                                                      onChange={(e, {value}) => this.setState({
                                                          ...this.state,
                                                          endPoint: {
                                                              ...this.state.endPoint,
                                                              address: {
                                                                  ...this.state.endPoint.address,
                                                                  country: value as string
                                                              }
                                                          }
                                                      })
                                                      }/>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Field>
                                        <label>Datum</label>
                                        <Input
                                            value={moment(new Date(this.state.endPoint.date)).format('YYYY-MM-DD')}
                                            onChange={(e, {value}) => {
                                                this.setState({
                                                    ...this.state,
                                                    endPoint: {
                                                        ...this.state.endPoint,
                                                        date: this.setTimeTo12(new Date(value)).getTime()
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
                                                               length: parseInt(value)
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
                                            <Input type="number" placeholder='Gewicht eingeben'
                                                   onChange={(e, {value}) => {
                                                       this.setState({
                                                           ...this.state,
                                                           vehicle: {
                                                               ...this.state.vehicle,
                                                               weight: parseInt(value)
                                                           }
                                                       })
                                                   }}/>
                                        </Form.Field>
                                    </Form.Group>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider/>

                            <Button positive floated="right" style={{marginRight: "30px", marginBottom: "10px"}}
                                    type="submit" onClick={() => {
                                this.searchTour()
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
