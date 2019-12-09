import { IDietType } from 'app/shared/model/products/diet-type.model';

export interface IDietTypeTranslation {
  id?: number;
  translation?: string;
  language?: string;
  dietType?: IDietType;
}

export class DietTypeTranslation implements IDietTypeTranslation {
  constructor(public id?: number, public translation?: string, public language?: string, public dietType?: IDietType) {}
}
