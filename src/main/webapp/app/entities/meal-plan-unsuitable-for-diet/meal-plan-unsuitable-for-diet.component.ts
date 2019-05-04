import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';
import { AccountService } from 'app/core';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';

@Component({
    selector: 'jhi-meal-plan-unsuitable-for-diet',
    templateUrl: './meal-plan-unsuitable-for-diet.component.html'
})
export class MealPlanUnsuitableForDietComponent implements OnInit, OnDestroy {
    mealPlanUnsuitableForDiets: IMealPlanUnsuitableForDiet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealPlanUnsuitableForDietService
            .query()
            .pipe(
                filter((res: HttpResponse<IMealPlanUnsuitableForDiet[]>) => res.ok),
                map((res: HttpResponse<IMealPlanUnsuitableForDiet[]>) => res.body)
            )
            .subscribe(
                (res: IMealPlanUnsuitableForDiet[]) => {
                    this.mealPlanUnsuitableForDiets = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealPlanUnsuitableForDiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealPlanUnsuitableForDiet) {
        return item.id;
    }

    registerChangeInMealPlanUnsuitableForDiets() {
        this.eventSubscriber = this.eventManager.subscribe('mealPlanUnsuitableForDietListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
