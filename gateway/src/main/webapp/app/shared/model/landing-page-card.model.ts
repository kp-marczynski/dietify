export interface ILandingPageCard {
  id?: number;
  ordinalNumber?: number;
  htmlContent?: any;
  cardImageContentType?: string;
  cardImage?: any;
}

export class LandingPageCard implements ILandingPageCard {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public htmlContent?: any,
    public cardImageContentType?: string,
    public cardImage?: any
  ) {}
}
