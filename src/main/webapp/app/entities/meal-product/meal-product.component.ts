import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealProduct } from 'app/shared/model/meal-product.model';
import { AccountService } from 'app/core';
import { MealProductService } from './meal-product.service';

@Component({
    selector: 'jhi-meal-product',
    templateUrl: './meal-product.component.html'
})
export class MealProductComponent implements OnInit, OnDestroy {
    mealProducts: IMealProduct[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealProductService: MealProductService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealProductService
            .query()
            .pipe(
                filter((res: HttpResponse<IMealProduct[]>) => res.ok),
                map((res: HttpResponse<IMealProduct[]>) => res.body)
            )
            .subscribe(
                (res: IMealProduct[]) => {
                    this.mealProducts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMealProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMealProduct) {
        return item.id;
    }

    registerChangeInMealProducts() {
        this.eventSubscriber = this.eventManager.subscribe('mealProductListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
