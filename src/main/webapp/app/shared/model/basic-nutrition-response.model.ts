export interface IBasicNutritionResponse {
    weight: number;

    energy: number;
    carbohydrates: number;
    fat: number;
    protein: number;

    addNutritions(nutritionData: IBasicNutritionResponse): void;

    floor(): void;

    scaleForWeight(weight: number): void;
}

export class BasicNutritionResponse implements IBasicNutritionResponse {
    constructor(
        public weight: number,
        public energy: number,
        public carbohydrates: number,
        public fat: number,
        public protein: number
    ) {
    }

    public addNutritions(nutritionData: IBasicNutritionResponse): void {
        this.weight += nutritionData.weight;
        this.energy += nutritionData.energy;
        this.carbohydrates += nutritionData.carbohydrates;
        this.fat += nutritionData.fat;
        this.protein += nutritionData.protein;
    }

    public floor(): void {
        this.energy = Math.floor(this.energy);
        this.carbohydrates = Math.floor(this.carbohydrates);
        this.fat = Math.floor(this.fat);
        this.protein = Math.floor(this.protein);
    }

    public scaleForWeight(weight: number): void {
        const scaleFactor = weight / this.weight;
        this.energy *= scaleFactor;
        this.carbohydrates *= scaleFactor;
        this.fat *= scaleFactor;
        this.protein *= scaleFactor;
    }
}
