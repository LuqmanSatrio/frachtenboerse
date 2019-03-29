export interface Adress {
    street: string;
    street2: string;
    number: string;
    city: string;
    country: string;
}

export type Vehicle= {
    vehicleType: "Sattelzug" | "Gliederzug" | "Kleinfahrzeug";
    weight : number;
    length: number;
    additionalEquipment: "gps" | "hydraulic ramp" | null
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
