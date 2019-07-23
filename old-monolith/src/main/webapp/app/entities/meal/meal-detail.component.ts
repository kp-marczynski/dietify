import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IMeal} from 'app/shared/model/meal.model';
import {IProduct} from 'app/shared/model/product.model';
import {IHouseholdMeasure} from 'app/shared/model/household-measure.model';
import {BasicNutritionType} from 'app/shared/model/enum/basic-nutritions.enum';
import {IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';

@Component({
    selector: 'jhi-meal-detail',
    templateUrl: './meal-detail.component.html'
})
export class MealDetailComponent {
    @Input() meal: IMeal;
    @Input() expectedEnergy: number;

    @Output() passEntry: EventEmitter<IMeal> = new EventEmitter();

    constructor(protected activatedRoute: ActivatedRoute) {
    }

    getMeasureById(product: IProduct, householdMeasureId: number): IHouseholdMeasure {
        return product.householdMeasures.find(measure => measure.id === householdMeasureId);
    }

    getMeasureDisplayDescription(product: IProduct, householdMeasureId: number): string {
        const measure = this.getMeasureById(product, householdMeasureId);
        if (measure) {
            return measure.description;
        } else {
            return 'g';
        }
    }

    passBack(meal: IMeal): void {
        this.passEntry.emit(meal);
    }

    calcPercent(currentValue: number, desiredValue: number): number {
        return Math.floor(((currentValue / desiredValue) - 1) * 100);
    }

    getSummaryIcon(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
        const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.expectedEnergy);
        if (Math.abs(percent) <= 3) {
            return 'check-circle';
        } else if (percent > 3) {
            return 'arrow-circle-up';
        } else {
            return 'arrow-circle-down';
        }
    }

    getSummaryButtonClass(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
        const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.expectedEnergy);
        if (Math.abs(percent) <= 3) {
            return 'btn-success';
        } else if (Math.abs(percent) <= 6) {
            return 'btn-warning';
        } else {
            return 'btn-danger';
        }
    }

    getNutritionValue(nutritionData: IBasicNutritionResponse, nutritionKey: string) {
        switch (BasicNutritionType[nutritionKey]) {
            case BasicNutritionType.Energy:
                return nutritionData.energy;
            case BasicNutritionType.Carbohydrates:
                return nutritionData.carbohydrates;
            case BasicNutritionType.Fat:
                return nutritionData.fat;
            case BasicNutritionType.Protein:
                return nutritionData.protein;
        }
    }
}
