import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';
import { AccountService } from 'app/core';
import { MealPlanDayService } from './meal-plan-day.service';

@Component({
    selector: 'jhi-meal-plan-day',
    templateUrl: './meal-plan-day.component.html'
})
export class MealPlanDayComponent implements OnInit, OnDestroy {
    mealPlanDays: IMealPlanDay[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealPlanDayService: MealPlanDayService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealPlanDayService
            .query()
            .pipe(
                filter((res: HttpResponse<IMealPlanDay[]>) => res.ok),
                map((res: HttpResponse<IMealPlanDay[]>) => res.body)
            )
            .subscribe(
                (res: IMealPlanDay[]) => {
                    this.mealPlanDays = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealPlanDays();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealPlanDay) {
        return item.id;
    }

    registerChangeInMealPlanDays() {
        this.eventSubscriber = this.eventManager.subscribe('mealPlanDayListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
