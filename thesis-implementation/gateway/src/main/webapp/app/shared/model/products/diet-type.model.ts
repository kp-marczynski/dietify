import { IDietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

export interface IDietType {
  id?: number;
  name?: string;
  translations?: IDietTypeTranslation[];
}

export class DietType implements IDietType {
  constructor(public id?: number, public name?: string, public translations?: IDietTypeTranslation[]) {}
}
