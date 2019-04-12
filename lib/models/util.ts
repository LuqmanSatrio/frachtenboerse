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

export type LoadingStation = "loadingStation" | "unloadingStation"

export type EndPoint = {
    address: Address;
    key?: number;
    loadingStation? : LoadingStation
    date: Date;
    startTime: number;
    endTime: number
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
