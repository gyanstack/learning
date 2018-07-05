export interface BoType {
    type: string;
}

export interface Replacer {
    id: number;
    replacerName: string;
    replacerValue: any;
}

export interface Codes {
    boType: BoType;
    replacers: Replacer[];
}
