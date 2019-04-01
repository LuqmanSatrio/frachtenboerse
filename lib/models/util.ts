export interface Adress {
    street: string;
    street2: string;
    number: string;
    city: string;
    country: string;
}

export type VehicleType = "Sattelzug" | "Gliederzug" | "Kleinfahrzeug";

export type Vehicle= {
    vehicleType: VehicleType
    weight : number;
    length: number;
    additionalEquipment: string[]
}

export type EndPoint = {
    adress: Adress;
    time: Date;
};

export interface Company {
    id: number;
    name: string;
    adress: Adress;
    website: string;
    email: string;
    telephone: string;
    fax: string;
}

export interface Contact {
    name: string;
    speakingLanguage: "german" | "english" | "other";
    telephone: string;
    fax: string;
    mobile: string;
}
