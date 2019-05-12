import {EndPoint, Company, Contact, Vehicle} from "./util";

export type Freight = {
    widthInMeter: number;
    weightInTon: number;
    freightType: string;
    price: number;
};

//referenceId is user id
export interface EndFreight {
    id: string;
    startingPoint: EndPoint;
    pointsBetween: EndPoint[];
    endPoint: EndPoint;
    freight: Freight;
    neededVehicle: Vehicle;
    contact: Contact;
    internalNote: string
}
