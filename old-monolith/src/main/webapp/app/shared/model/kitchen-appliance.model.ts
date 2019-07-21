export interface IKitchenAppliance {
    id?: number;
    namePolish?: string;
    nameEnglish?: string;
}

export class KitchenAppliance implements IKitchenAppliance {
    constructor(public id?: number, public namePolish?: string, public nameEnglish?: string) {}
}
