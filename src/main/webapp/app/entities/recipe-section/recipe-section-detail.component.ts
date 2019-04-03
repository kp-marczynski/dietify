import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipeSection } from 'app/shared/model/recipe-section.model';

@Component({
    selector: 'jhi-recipe-section-detail',
    templateUrl: './recipe-section-detail.component.html'
})
export class RecipeSectionDetailComponent implements OnInit {
    recipeSection: IRecipeSection;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recipeSection }) => {
            this.recipeSection = recipeSection;
        });
    }

    previousState() {
        window.history.back();
    }
}
