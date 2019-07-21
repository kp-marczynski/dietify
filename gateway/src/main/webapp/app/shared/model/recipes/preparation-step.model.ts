export interface IPreparationStep {
  id?: number;
  ordinalNumber?: number;
  stepDescription?: any;
  recipeSectionSectionName?: string;
  recipeSectionId?: number;
}

export class PreparationStep implements IPreparationStep {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public stepDescription?: any,
    public recipeSectionSectionName?: string,
    public recipeSectionId?: number
  ) {}
}
