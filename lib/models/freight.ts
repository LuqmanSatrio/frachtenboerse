import { EndPoint, Company, Contact, Vehicle } from "./util";

type Freight = {
    widthInMeter: number;
    weightInTon: number;
    freightType: string;
    price: number;
};

//referenceId is user id
export interface EndFreight {
    id: string;
    endPoints: EndPoint[];
    freight: Freight;
    neededVehicle: Vehicle;
    contact: Contact;
    internalNote: string
}
