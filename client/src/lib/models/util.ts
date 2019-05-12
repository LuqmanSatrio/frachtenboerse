export interface Address {
    street: string;
    street2?: string;
    number?: string;
    postcode?: string;
    city?: string;
    country?: string;
}

export type VehicleType = "Sattelzug" | "Gliederzug" | "Kleinfahrzeug";

export type Vehicle= {
    vehicleType: VehicleType
    weight : number;
    length: number;
    additionalEquipment: string[]
}
export const countryOptions = [{value: "Belgium", flag: "be", text: "Belgien"},
    {value: "Deutschland", flag: "de", text: "Deutschland"},
    {value: "Estonia", flag: "ee", text: "Estland"},
    {value: "France", flag: "fr", text: "Frankreich"},
    {value: "United Kingdom", flag: "gb", text: "Großbritanien"},
    {value: "Italy", flag: "it", text: "Italien"},
    {value: "Ireland", flag: "ir", text: "Irland"},
    {value: "Croatia", flag: "hr", text: "Kroatien"},
    {value: "Latvia", flag: "lv", text: "Lettland"},
    {value: "Liechtenstein", flag: "li", text: "Liechtenstein"},
    {value: "Lithuania", flag: "lt", text: "Litauen"},
    {value: "Luxemburg", flag: "lu", text: "Luxemburg"},
    {value: "Netherlands", flag: "nl", text: "Niederlande"},
    {value: "Österreich", flag: "at", text: "Österreich"},
    {value: "Poland", flag: "pl", text: "Polen"},
    {value: "Sweden", flag: "se", text: "Schweden"},
    {value: "Schweiz", flag: "ch", text: "Schweiz"},
    {value: "Slovakia", flag: "sk", text: "Slowakei"},
    {value: "Slovenia", flag: "si", text: "Slowenien"},
    {value: "Spain", flag: "es", text: "Spanien"},
    {value: "Czech Republic", flag: "cz", text: "Tschechien"},
    {value: "Hungary", flag: "hu", text: "Ungarn"}];

export type LoadingStation = "loadingStation" | "unloadingStation"

export type EndPoint = {
    address: Address;
    loadingStation?: LoadingStation
    date: number;
    startTime?: number;
    endTime?: number
};

export interface Company {
    id: number;
    name: string;
    address: Address;
    website: string;
    email: string;
    telephone: string;
    fax: string;
}

export interface Contact {
    name: string;
    speakingLanguage?: "german" | "english" | "other";
    telephone?: string;
    fax?: string;
    mobile?: string;
}
