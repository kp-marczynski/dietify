import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealPlanSuitableForDiet } from 'app/shared/model/meal-plan-suitable-for-diet.model';
import { AccountService } from 'app/core';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';

@Component({
    selector: 'jhi-meal-plan-suitable-for-diet',
    templateUrl: './meal-plan-suitable-for-diet.component.html'
})
export class MealPlanSuitableForDietComponent implements OnInit, OnDestroy {
    mealPlanSuitableForDiets: IMealPlanSuitableForDiet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealPlanSuitableForDietService: MealPlanSuitableForDietService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealPlanSuitableForDietService
            .query()
            .pipe(
                filter((res: HttpResponse<IMealPlanSuitableForDiet[]>) => res.ok),
                map((res: HttpResponse<IMealPlanSuitableForDiet[]>) => res.body)
            )
            .subscribe(
                (res: IMealPlanSuitableForDiet[]) => {
                    this.mealPlanSuitableForDiets = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealPlanSuitableForDiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealPlanSuitableForDiet) {
        return item.id;
    }

    registerChangeInMealPlanSuitableForDiets() {
        this.eventSubscriber = this.eventManager.subscribe('mealPlanSuitableForDietListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
