export interface IDishType {
    id?: number;
    descriptionPolish?: string;
    descriptionEnglish?: string;
}

export class DishType implements IDishType {
    constructor(public id?: number, public descriptionPolish?: string, public descriptionEnglish?: string) {}
}
