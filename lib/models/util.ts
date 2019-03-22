export interface adress {
    street: string;
    street2: string;
    number: string;
    city: string;
    country: string;
}

export type vehicle= {
    note: string
}

export type endPoint = {
    adress: adress;
    time: Date;
};

export interface company {
    id: number;
    name: string;
    adress: adress;
    website: string;
    email: string;
    telephone: string;
    fax: string;
}

export interface contact {
    name: string;
    speakingLanguage: "german" | "english" | "other";
    telephone: string;
    fax: string;
    mobile: string;
}
