import {adress, company} from "./util";

export interface  User {
    id: number,
    sal: string,
    type: "user",
    email: string,
    firstname: string,
    lastname: string,
    company: company,
    adress: adress,
    taxId: number
}