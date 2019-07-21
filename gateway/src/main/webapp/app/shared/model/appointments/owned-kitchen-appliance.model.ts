export interface IOwnedKitchenAppliance {
  id?: number;
  kitchenApplianceId?: number;
  nutritionalInterviewId?: number;
}

export class OwnedKitchenAppliance implements IOwnedKitchenAppliance {
  constructor(public id?: number, public kitchenApplianceId?: number, public nutritionalInterviewId?: number) {}
}
