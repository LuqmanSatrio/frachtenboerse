import { EndPoint, Company, Contact, Vehicle } from "./util";

type freight = {
    widthInMeter: number;
    weightInTon: number;
};

//referenceId is user id
export interface endFreight {
    id: string;
    referenceId: string;
    statingPoint: EndPoint;
    endPoint: EndPoint;
    freight: freight;
    neededVehicle: Vehicle;
    note: string;
    contact: Contact;
}
