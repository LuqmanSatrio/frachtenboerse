import { Company, Contact, EndPoint, Vehicle } from "./util";

//referenceId is user id
export interface Tour {
    id: string;
    referenceId: string;
    contact: Contact;
    startPoint: EndPoint;
    endPoint: EndPoint;
    vehicleType: Vehicle;
}
