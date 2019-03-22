import { company, contact, endPoint, vehicle } from "./util";

//referenceId is user id
export interface tour {
    id: string;
    referenceId: string;
    contact: contact;
    startPoint: endPoint;
    endPoint: endPoint;
    vehicleType: vehicle;
}
