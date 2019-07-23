export interface IHouseholdMeasure {
    id?: number;
    description?: string;
    gramsWeight?: number;
    isVisible?: boolean;
}

export class HouseholdMeasure implements IHouseholdMeasure {
    constructor(
        public id?: number,
        public description?: string,
        public gramsWeight?: number,
        public isVisible?: boolean
    ) {
        this.isVisible = this.isVisible || false;
    }
}
