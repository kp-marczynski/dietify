export interface IMealType {
    id?: number;
    namePolish?: string;
    nameEnglish?: string;
}

export class MealType implements IMealType {
    constructor(public id?: number, public namePolish?: string, public nameEnglish?: string) {}
}
