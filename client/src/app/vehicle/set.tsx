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
    TextArea,
    Select,
    Button, Dropdown
} from "semantic-ui-react";
import {Vehicle, VehicleType, EndPoint, countryOptions} from "../../lib/models/util"
import {Api} from "../../api";

const api = new Api();

let moment = require('moment');


type VehicleSearchState = {
    startingPoint: EndPoint,
    endPoint: EndPoint,
    vehicle: Vehicle,
    loading: boolean,
    contactOption: object,
    interNote: string,
    externalNote: string
}

const contactOptions = [{text: "Max Mustermann", value: "Max Mustermann"}]
const vehicleOptions = [{key: "s", text: 'Sattelzug', value: 'Sattelzug'}, {
    key: "g",
    text: 'Gliederzug',
    value: 'Gliederzug'
}, {key: "k", text: 'Kleinfahrzeug', value: 'Kleinfahrzeug'}];

export class VehicleSetComponent extends React.Component<any, VehicleSearchState> {

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
            loading: false,
            contactOption: {
                name: ""
            },
            interNote: "",
            externalNote: ""
        }
    }

    setTimeTo12(date: Date){
        date.setHours(12,0,0,0);
        return(date)
    }


    async setTour(){
        this.setState({loading: true});
        try {
           const result = await api.sendTour(this.state);
            console.log(result);
        }
        catch (e) {
            console.error("error when setting tour", e)
        }
        this.setState({loading: false});
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
            })
        }
    }

    render() {

        return (
            <Container style={{marginTop: "80px"}}>
                <Header as='h1'>Fahrt einstellen</Header>
                <Segment>
                    <Form>
                        <Grid>
                            <Grid.Row divided>
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
                                                })
                                            }} type="date" placeholder='Datum eingeben'/>
                                    </Form.Field>
                                </Grid.Column>
                                <Divider vertical/>
                                <Grid.Column width={4}>
                                    <Header as='h4'> Endpunkt </Header>
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
                                            <Input type="number" placeholder='Gewicht eingeben'  onChange={(e, {value}) => {
                                                this.setState({
                                                    ...this.state,
                                                    vehicle: {
                                                        ...this.state.vehicle,
                                                        length: parseInt(value)
                                                    }
                                                })
                                            }
                                            }/>
                                        </Form.Field>
                                    </Form.Group>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider/>
                            <Grid.Row style={{marginRight: "10px", marginLeft: "10px"}}>
                                <Grid.Column width={5}>
                                    <Form.Field>
                                        <label>Kontaktperson</label>
                                        <Select
                                            options={contactOptions}
                                            placeholder='Kontaktperson auswählen'
                                            onChange={(e, {value}) => this.setState({
                                                ...this.state,
                                                contactOption: {
                                                    ...this.state.contactOption,
                                                    name: value
                                                }
                                            })}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Form.Field>
                                        <label>Interne Bemerkung</label>
                                        <TextArea
                                            value={this.state.interNote}
                                            onChange={(e, {value}) => this.setState({
                                                ...this.state,
                                               interNote: value as string
                                            })}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Form.Field>
                                        <label>Externe Bemerkung</label>
                                        <TextArea
                                            value={this.state.externalNote}
                                            onChange={(e, {value}) => this.setState({
                                                ...this.state,
                                                externalNote: value as string
                                            })}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider style={{marginBottom: "0px",marginLeft: "0px",marginRight: "0px"}}/>
                            <Grid.Row style={{background: "#f9f9f9"}}>
                                <Grid.Column floated="right" width={6}>
                                    <Button loading={this.state.loading} positive onClick={() => this.setTour()}> Speichern </Button>
                                    <Button negative> Abbrechen </Button>
                                    <Button> Vorlage verwenden </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </Container>
        )
    }
}
