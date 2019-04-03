import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealType } from 'app/shared/model/meal-type.model';
import { AccountService } from 'app/core';
import { MealTypeService } from './meal-type.service';

@Component({
    selector: 'jhi-meal-type',
    templateUrl: './meal-type.component.html'
})
export class MealTypeComponent implements OnInit, OnDestroy {
    mealTypes: IMealType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealTypeService: MealTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IMealType[]>) => res.ok),
                map((res: HttpResponse<IMealType[]>) => res.body)
            )
            .subscribe(
                (res: IMealType[]) => {
                    this.mealTypes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealType) {
        return item.id;
    }

    registerChangeInMealTypes() {
        this.eventSubscriber = this.eventManager.subscribe('mealTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
