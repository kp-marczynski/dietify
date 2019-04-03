import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipe-unsuitable-for-diet.model';
import { AccountService } from 'app/core';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';

@Component({
    selector: 'jhi-recipe-unsuitable-for-diet',
    templateUrl: './recipe-unsuitable-for-diet.component.html'
})
export class RecipeUnsuitableForDietComponent implements OnInit, OnDestroy {
    recipeUnsuitableForDiets: IRecipeUnsuitableForDiet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.recipeUnsuitableForDietService
            .query()
            .pipe(
                filter((res: HttpResponse<IRecipeUnsuitableForDiet[]>) => res.ok),
                map((res: HttpResponse<IRecipeUnsuitableForDiet[]>) => res.body)
            )
            .subscribe(
                (res: IRecipeUnsuitableForDiet[]) => {
                    this.recipeUnsuitableForDiets = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRecipeUnsuitableForDiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecipeUnsuitableForDiet) {
        return item.id;
    }

    registerChangeInRecipeUnsuitableForDiets() {
        this.eventSubscriber = this.eventManager.subscribe('recipeUnsuitableForDietListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
