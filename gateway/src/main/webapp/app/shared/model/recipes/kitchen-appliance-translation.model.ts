export interface IKitchenApplianceTranslation {
  id?: number;
  translation?: string;
  language?: string;
  kitchenApplianceName?: string;
  kitchenApplianceId?: number;
}

export class KitchenApplianceTranslation implements IKitchenApplianceTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public kitchenApplianceName?: string,
    public kitchenApplianceId?: number
  ) {}
}
