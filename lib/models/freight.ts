import { endPoint, company, contact, vehicle } from "./util";

type freight = {
    widthInMeter: number;
    weightInTon: number;
};

//referenceId is user id
export interface endFreight {
    id: string;
    referenceId: string;
    statingPoint: endPoint;
    endPoint: endPoint;
    freight: freight;
    neededVehicle: vehicle;
    note: string;
    contact: contact;
}
