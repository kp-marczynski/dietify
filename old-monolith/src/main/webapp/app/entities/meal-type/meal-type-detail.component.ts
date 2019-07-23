import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealType } from 'app/shared/model/meal-type.model';

@Component({
    selector: 'jhi-meal-type-detail',
    templateUrl: './meal-type-detail.component.html'
})
export class MealTypeDetailComponent implements OnInit {
    mealType: IMealType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealType }) => {
            this.mealType = mealType;
        });
    }

    previousState() {
        window.history.back();
    }
}
