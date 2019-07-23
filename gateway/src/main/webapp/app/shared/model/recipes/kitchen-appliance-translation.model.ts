import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';

export interface IKitchenApplianceTranslation {
  id?: number;
  translation?: string;
  language?: string;
  kitchenAppliance?: IKitchenAppliance;
}

export class KitchenApplianceTranslation implements IKitchenApplianceTranslation {
  constructor(public id?: number, public translation?: string, public language?: string, public kitchenAppliance?: IKitchenAppliance) {}
}
