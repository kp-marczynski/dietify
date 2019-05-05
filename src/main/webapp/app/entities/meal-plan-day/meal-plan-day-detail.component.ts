import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';

@Component({
    selector: 'jhi-meal-plan-day-detail',
    templateUrl: './meal-plan-day-detail.component.html'
})
export class MealPlanDayDetailComponent implements OnInit {
    mealPlanDay: IMealPlanDay;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealPlanDay }) => {
            this.mealPlanDay = mealPlanDay;
        });
    }

    previousState() {
        window.history.back();
    }
}
