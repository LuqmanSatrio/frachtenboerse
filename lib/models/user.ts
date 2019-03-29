import {Adress, Company} from "./util";

export interface  User {
    id: number,
    sal: string,
    type: "user",
    email: string,
    firstname: string,
    lastname: string,
    company: Company,
    adress: Adress,
    taxId: number
}