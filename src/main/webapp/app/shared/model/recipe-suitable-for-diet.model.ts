export interface IRecipeSuitableForDiet {
    id?: number;
    dietTypeId?: number;
}

export class RecipeSuitableForDiet implements IRecipeSuitableForDiet {
    constructor(public id?: number, public dietTypeId?: number) {
    }
}
