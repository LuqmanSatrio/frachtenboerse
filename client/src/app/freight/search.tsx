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
import {Vehicle, VehicleType, EndPoint, countryOptions} from "../../lib/models/util"
import {EndFreight} from "../../lib/models/freight";

let moment = require('moment');
import {Api} from "../../api";

const api: Api = new Api();


type VehicleSearchState = {
    startingPoint: EndPoint,
    endpoint: EndPoint,
    vehicle: Vehicle,
    searched: boolean,
    loading: boolean,
    suggestedResults: EndFreight[]
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
                address: {
                    street: "",
                    number: "",
                    postcode: "",
                    city: "",
                    country: ""
                },
                loadingStation: "loadingStation",
                date: this.setTimeTo12(new Date()).getTime(),

            },
            endpoint: {
                address: {
                    street: "",
                    number: "",
                    postcode: "",
                    city: "",
                    country: ""
                },
                loadingStation: "unloadingStation",
                date: this.setTimeTo12(new Date()).getTime(),
            },
            vehicle: {
                vehicleType: "Sattelzug",
                weight: 0,
                length: 0,
                additionalEquipment: []
            },
            searched: false,
            suggestedResults: [],
            loading: false
        }
    }

    async getFreight() {
        try {
            let result = await api.getFreights({
                startingPoint: this.state.startingPoint,
                endPoint: this.state.endpoint,
                neededVehicle: this.state.vehicle,
            });

            this.setState({suggestedResults: result, loading: false});

        } catch (e) {
            console.log("err")
        }
    }

    async getAllFreights() {
        try {
            let result = await api.getAllFreights();
            console.log(result);

            this.setState({suggestedResults: result, loading: false});

        } catch (e) {
            console.log(e)
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

    setTimeTo12(date: Date){
        date.setHours(12,0,0,0);
        return(date)
    }


    render() {

        const {searched, suggestedResults, loading} = this.state;

        let showTable = searched ? "block" : "none";


        let suggestedSearchResult = suggestedResults.map((result, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{moment(new Date(result.startingPoint.date)).format('DD.MM.YYYY')}</Table.Cell>
                    <Table.Cell>{ result.startingPoint? result.startingPoint.address.city : ""}</Table.Cell>
                    <Table.Cell>{ result.startingPoint && result.pointsBetween && result.endPoint? result.startingPoint.address.city + ", " + result.pointsBetween.map((endpoint) => {
                        return (endpoint.address.city)
                    }).join(", ") + ", " + result.endPoint.address.city : ""
                    }</Table.Cell>
                    <Table.Cell>{result.freight.weightInTon + " kg"}</Table.Cell>
                    <Table.Cell>{result.freight.widthInMeter + " m"}</Table.Cell>
                    <Table.Cell>{result.freight.freightType}</Table.Cell>
                    <Table.Cell>{result.freight.price}</Table.Cell>
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
                                    <Header as='h4'> Startpunkt </Header>
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
                                                });

                                            }
                                            } type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Divider vertical/>
                                <Grid.Column width={4}>
                                    <Header as='h4'> Endpunkt </Header>
                                    <Form.Field>
                                        <label>Stadt</label>
                                        <Input value={this.state.endpoint.address.city}
                                               onChange={(e, {value}) => this.setState({
                                                   ...this.state,
                                                   endpoint: {
                                                       ...this.state.endpoint,
                                                       address: {
                                                           ...this.state.endpoint.address,
                                                           city: value
                                                       }
                                                   }
                                               })
                                               } placeholder='Stadt eingeben'/>
                                    </Form.Field>
                                    <Form.Group>
                                        <Form.Field width={10}>
                                            <label>Postleitzahl</label>
                                            <Input type='number' value={this.state.endpoint.address.postcode}
                                                   onChange={(e, {value}) => this.setState({
                                                       ...this.state,
                                                       endpoint: {
                                                           ...this.state.endpoint,
                                                           address: {
                                                               ...this.state.endpoint.address,
                                                               postcode: value
                                                           }
                                                       }
                                                   })
                                                   }/>
                                        </Form.Field>
                                        <Form.Field width={14}>
                                            <label>Land</label>
                                            <Dropdown fluid
                                                      selection value={this.state.endpoint.address.country}
                                                      options={countryOptions}
                                                      onChange={(e, {value}) => this.setState({
                                                          ...this.state,
                                                          endpoint: {
                                                              ...this.state.endpoint,
                                                              address: {
                                                                  ...this.state.endpoint.address,
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
                                            value={moment(new Date(this.state.endpoint.date)).format('YYYY-MM-DD')}
                                            onChange={(e, {value}) => {
                                                this.setState({
                                                    ...this.state,
                                                    endpoint: {
                                                        ...this.state.endpoint,
                                                        date: this.setTimeTo12(new Date(value)).getTime()
                                                    }
                                                });

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
                                                value='hydraulicramp'
                                                checked={this.state.vehicle.additionalEquipment.includes('hydraulicramp')}
                                                onChange={(e, value) => this.handleAdditionalEquipmentChange(value.value as string)}/>

                                        </Form.Field>
                                        <Form.Field>
                                            <label>Gewicht</label>
                                            <Input type='number' placeholder='Gewicht eingeben'
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

                            <Button positive floated="right" loading={loading}
                                    style={{marginRight: "30px", marginBottom: "10px"}}
                                    type="submit" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    searched: true,
                                    loading: true
                                });
                                this.getAllFreights();
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
                                            <Table.HeaderCell width={1}>Frachtart</Table.HeaderCell>
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
