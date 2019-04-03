import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipeSuitableForDiet } from 'app/shared/model/recipe-suitable-for-diet.model';

@Component({
    selector: 'jhi-recipe-suitable-for-diet-detail',
    templateUrl: './recipe-suitable-for-diet-detail.component.html'
})
export class RecipeSuitableForDietDetailComponent implements OnInit {
    recipeSuitableForDiet: IRecipeSuitableForDiet;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recipeSuitableForDiet }) => {
            this.recipeSuitableForDiet = recipeSuitableForDiet;
        });
    }

    previousState() {
        window.history.back();
    }
}
