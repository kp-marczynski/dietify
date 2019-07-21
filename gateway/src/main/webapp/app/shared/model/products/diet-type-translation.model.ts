export interface IDietTypeTranslation {
  id?: number;
  translation?: string;
  language?: string;
  dietTypeName?: string;
  dietTypeId?: number;
}

export class DietTypeTranslation implements IDietTypeTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public dietTypeName?: string,
    public dietTypeId?: number
  ) {}
}
