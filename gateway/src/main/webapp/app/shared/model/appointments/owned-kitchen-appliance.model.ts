import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

export interface IOwnedKitchenAppliance {
  id?: number;
  kitchenApplianceId?: number;
  nutritionalInterview?: INutritionalInterview;
}

export class OwnedKitchenAppliance implements IOwnedKitchenAppliance {
  constructor(public id?: number, public kitchenApplianceId?: number, public nutritionalInterview?: INutritionalInterview) {}
}
