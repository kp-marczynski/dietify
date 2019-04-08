export interface IPreparationStep {
    id?: number;
    ordinalNumber?: number;
    stepDescription?: string;
}

export class PreparationStep implements IPreparationStep {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public stepDescription?: string
    ) {
    }
}
