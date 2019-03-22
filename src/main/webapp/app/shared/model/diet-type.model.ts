export interface IDietType {
    id?: number;
    namePolish?: string;
    nameEnglish?: string;
}

export class DietType implements IDietType {
    constructor(public id?: number, public namePolish?: string, public nameEnglish?: string) {}
}
