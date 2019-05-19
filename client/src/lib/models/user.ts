import {Address, Company} from "./util";

export interface  User {
    id: number,
    sal: string,
    type: "user",
    email: string,
    firstname: string,
    lastname: string,
    company: Company,
    adress: Address,
    taxId: number
}