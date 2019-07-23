import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealDefinition } from 'app/shared/model/meal-definition.model';

@Component({
    selector: 'jhi-meal-definition-detail',
    templateUrl: './meal-definition-detail.component.html'
})
export class MealDefinitionDetailComponent implements OnInit {
    mealDefinition: IMealDefinition;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealDefinition }) => {
            this.mealDefinition = mealDefinition;
        });
    }

    previousState() {
        window.history.back();
    }
}
