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
    Button
} from "semantic-ui-react";
import {EndFreight} from "../../../../lib/models/freight";
import {EndPoint, LoadingStation, VehicleType} from "../../../../lib/models/util";

const contactOptions = [{text: "Max Mustermann", value: "Max Mustermann"}];
const vehicleOptions = [{key: "s", text: 'Sattelzug', value: 'Sattelzug'}, {
    key: "g",
    text: 'Gliederzug',
    value: 'Gliederzug'
}, {key: "k", text: 'Kleinfahrzeug', value: 'Kleinfahrzeug'}];
const loadingOptions = [{text: "Beladestelle", value: "loadingStation"}, {
    text: "Entladestelle",
    value: "unLoadingStation"
}];

export default class FreightSet extends React.Component<any, EndFreight> {

    constructor(props: any) {
        super(props);

        this.state = {
            id: "",
            endPoints: [{
                address: {street: ""},
                loadingStation: "loadingStation",
                date: new Date(),
                startTime: 0,
                endTime: 0
            }],
            freight: {
                widthInMeter: 0,
                weightInTon: 0,
                freightType: "",
                price: 0,
            },
            neededVehicle: {
                vehicleType: "Sattelzug",
                weight: 0,
                length: 0,
                additionalEquipment: []
            },
            contact: {name: ""},
            internalNote: ""
        }
    }

    createNewEndPoint() {
        const emptyEndPoint: EndPoint =
            {
                address: {
                    street: "", number: "", postcode: "string",
                    city: "",
                    country: ""
                },
                loadingStation: "loadingStation",
                date: new Date(),
                startTime: 0,
                endTime: 0
            };

        const mergedArray = this.state.endPoints;
        mergedArray.push(emptyEndPoint);

        this.setState({
            endPoints: mergedArray
        })

    }

    handleAdditionalEquipmentChange(value: string) {
        if (this.state.neededVehicle.additionalEquipment.includes(value)) {
            this.setState({
                ...this.state,
                neededVehicle: {
                    ...this.state.neededVehicle,
                    additionalEquipment: this.state.neededVehicle.additionalEquipment.filter(item => item !== value)
                }

            });
        } else {
            this.setState({
                ...this.state,
                neededVehicle: {
                    ...this.state.neededVehicle,
                    additionalEquipment: [...this.state.neededVehicle.additionalEquipment, value]
                }
            })
        }
    }


    render() {

        const {endPoints} = this.state;

        let endPointsRow = endPoints.map((endPoints, key) => {
            return (
                <Form.Group>
                    <Form.Field>
                        <label>Be/Entladestelle</label>
                        <Select
                            options={loadingOptions}
                            placeholder='Be/Entladestelle auswählen'
                            value={this.state.endPoints[key].loadingStation}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    loadingStation: value as LoadingStation
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label>Straße</label>
                        <Input
                            value={this.state.endPoints[key].address.street}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    address: {...this.state.endPoints[key].address, street: value},
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={1}>
                        <label>HausNr</label>
                        <Input
                            value={this.state.endPoints[key].address.number}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    address: {...this.state.endPoints[key].address, number: value},
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label>Plz</label>
                        <Input
                            value={this.state.endPoints[key].address.street}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    address: {...this.state.endPoints[key].address, postcode: value},
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label>Ort</label>
                        <Input
                            value={this.state.endPoints[key].address.street}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    address: {...this.state.endPoints[key].address, city: value},
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label>Land</label>
                        <Input
                            value={this.state.endPoints[key].address.street}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    address: {...this.state.endPoints[key].address, country: value},
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label>Start Uhrzeit</label>
                        <Input
                            type='number'
                            value={this.state.endPoints[key].startTime}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    startTime: value as any,
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label>End Uhrzeit</label>
                        <Input
                            type='number'
                            value={this.state.endPoints[key].endTime}
                            onChange={(e, {value}) => this.setState({
                                ...this.state,
                                endPoints: [...this.state.endPoints.slice(0, key), {
                                    ...this.state.endPoints[key],
                                    endTime: value as any,
                                }, ...this.state.endPoints.slice(key + 1)]
                            })}
                        />
                    </Form.Field>
                </Form.Group>
            )
        });


        return (
            <Container style={{marginTop: "80px"}}>
                <Header as='h1'>Fracht einstellen</Header>
                <Segment>
                    <Form>
                        <Grid>
                            <Grid.Row >
                                <Grid.Column>
                                    {endPointsRow}
                                    <Button floated="right" positive
                                            onClick={() => this.createNewEndPoint()}> + </Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider/>
                            <Grid.Row divided>
                                <Grid.Column width={5}>
                                    <Header as='h4'> Frachtbeschreibung </Header>
                                    <Form.Group>
                                        <Form.Field width={9}>
                                            <label>Länge in m</label>
                                            <Input
                                                type={'number'}
                                                value={this.state.freight.widthInMeter}
                                                onChange={(e, {value}) => this.setState({
                                                    freight: {
                                                        ...this.state.freight,
                                                        widthInMeter: value as any
                                                    }
                                                })}
                                            />
                                        </Form.Field>
                                        <Form.Field width={9}>
                                            <label>Gewicht in t</label>
                                            <Input
                                                type={'number'}
                                                value={this.state.freight.weightInTon}
                                                onChange={(e, {value}) => this.setState({
                                                    freight: {
                                                        ...this.state.freight,
                                                        weightInTon: value as any
                                                    }
                                                })}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field width={9}>
                                            <label>Warenart</label>
                                            <Input
                                                type={'text'}
                                                value={this.state.freight.freightType}
                                                onChange={(e, {value}) => this.setState({
                                                    freight: {
                                                        ...this.state.freight,
                                                        freightType: value as any
                                                    }
                                                })}
                                            />
                                        </Form.Field>
                                        <Form.Field width={9}>
                                            <label>Vergütung</label>
                                            <Input
                                                type={'text'}
                                                value={this.state.freight.price}
                                                onChange={(e, {value}) => this.setState({
                                                    freight: {
                                                        ...this.state.freight,
                                                        price: value as any
                                                    }
                                                })}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Grid.Column width={8}>
                                        <Header as='h4'> Benötigtes Fahrzeug </Header>
                                        <Form.Group
                                            style={{marginTop: "25px"}}
                                            widths={"equal"}>
                                            <Form.Field>
                                                <label>Fahrzeugtyp</label>
                                                <Select
                                                    options={vehicleOptions}
                                                    placeholder='Fahrzeugtyp auswählen'
                                                    onChange={(e,{value}) => this.setState({
                                                        ...this.state,
                                                        neededVehicle: {
                                                            ...this.state.neededVehicle,
                                                            vehicleType: value as VehicleType
                                                        }
                                                    })}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Länge</label>
                                                <Input type='number' placeholder='Länge eingeben' onChange={(e, {value}) => {
                                                    this.setState({
                                                        ...this.state,
                                                        neededVehicle: {
                                                            ...this.state.neededVehicle,
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
                                                    checked={this.state.neededVehicle.additionalEquipment.includes('gps')}
                                                    onClick={(e, value)=> this.handleAdditionalEquipmentChange(value.value as string)}/>
                                                <Form.Checkbox
                                                    label='Hebebühne'
                                                    value='hydraulicRamp'
                                                    checked={this.state.neededVehicle.additionalEquipment.includes('hydraulicRamp')}
                                                    onChange={(e, value)=> this.handleAdditionalEquipmentChange(value.value as string)}/>

                                            </Form.Field>
                                            <Form.Field>
                                                <label>Gewicht</label>
                                                <input type="number" placeholder='Gewicht eingeben'/>
                                            </Form.Field>
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Form.Field>
                                        <label>Kontaktperson</label>
                                        <Select options={contactOptions} value={this.state.contact.name} onChange={(e, {v}) => {this.setState({
                                            contact: {
                                                ...this.state.contact,
                                                name: v
                                            }
                                        })}}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>interne Bemerkung</label>
                                        <TextArea value={this.state.internalNote} onChange={(e, {v}) => this.setState({internalNote: v})}/>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider style={{marginBottom: "0px",marginLeft: "0px",marginRight: "0px"}}/>
                            <Grid.Row style={{background: "#f9f9f9"}}>
                                <Grid.Column floated="right" width={6}>
                                    <Button positive> Speichern </Button>
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
