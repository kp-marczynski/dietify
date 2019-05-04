import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';

@Component({
    selector: 'jhi-meal-plan-unsuitable-for-diet-detail',
    templateUrl: './meal-plan-unsuitable-for-diet-detail.component.html'
})
export class MealPlanUnsuitableForDietDetailComponent implements OnInit {
    mealPlanUnsuitableForDiet: IMealPlanUnsuitableForDiet;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealPlanUnsuitableForDiet }) => {
            this.mealPlanUnsuitableForDiet = mealPlanUnsuitableForDiet;
        });
    }

    previousState() {
        window.history.back();
    }
}
