import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CaloriesConverterService {
    // https://healthyeating.sfgate.com/gram-protein-carbohydrates-contains-many-kilocalories-5978.html
    kcalInCarbohydrate = 4;
    kcalInFat = 9;
    kcalInProtein = 4;

    constructor() {
    }

    public calcCarbohydrateGrams(kcal: number): number {
        return kcal / this.kcalInCarbohydrate;
    }

    public calcFatGrams(kcal: number): number {
        return kcal / this.kcalInFat;
    }

    public calcProteinGrams(kcal: number): number {
        return kcal / this.kcalInProtein;
    }
}
