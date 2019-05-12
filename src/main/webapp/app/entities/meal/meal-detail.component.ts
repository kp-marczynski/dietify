import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IMeal} from 'app/shared/model/meal.model';
import {IProduct} from 'app/shared/model/product.model';
import {IHouseholdMeasure} from 'app/shared/model/household-measure.model';

@Component({
    selector: 'jhi-meal-detail',
    templateUrl: './meal-detail.component.html'
})
export class MealDetailComponent {
    @Input() meal: IMeal;
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
}
