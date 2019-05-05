import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealRecipe } from 'app/shared/model/meal-recipe.model';
import { AccountService } from 'app/core';
import { MealRecipeService } from './meal-recipe.service';

@Component({
    selector: 'jhi-meal-recipe',
    templateUrl: './meal-recipe.component.html'
})
export class MealRecipeComponent implements OnInit, OnDestroy {
    mealRecipes: IMealRecipe[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealRecipeService: MealRecipeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealRecipeService
            .query()
            .pipe(
                filter((res: HttpResponse<IMealRecipe[]>) => res.ok),
                map((res: HttpResponse<IMealRecipe[]>) => res.body)
            )
            .subscribe(
                (res: IMealRecipe[]) => {
                    this.mealRecipes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealRecipes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealRecipe) {
        return item.id;
    }

    registerChangeInMealRecipes() {
        this.eventSubscriber = this.eventManager.subscribe('mealRecipeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
