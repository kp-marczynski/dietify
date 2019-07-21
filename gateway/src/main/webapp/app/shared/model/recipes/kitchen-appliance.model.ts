import { IKitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

export interface IKitchenAppliance {
  id?: number;
  name?: string;
  translations?: IKitchenApplianceTranslation[];
}

export class KitchenAppliance implements IKitchenAppliance {
  constructor(public id?: number, public name?: string, public translations?: IKitchenApplianceTranslation[]) {}
}
