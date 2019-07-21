import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductSubcategory } from 'app/shared/model/product-subcategory.model';
import { AccountService } from 'app/core';
import { ProductSubcategoryService } from './product-subcategory.service';

@Component({
    selector: 'jhi-product-subcategory',
    templateUrl: './product-subcategory.component.html'
})
export class ProductSubcategoryComponent implements OnInit, OnDestroy {
    productSubcategories: IProductSubcategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected productSubcategoryService: ProductSubcategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.productSubcategoryService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductSubcategory[]>) => res.ok),
                map((res: HttpResponse<IProductSubcategory[]>) => res.body)
            )
            .subscribe(
                (res: IProductSubcategory[]) => {
                    this.productSubcategories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductSubcategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductSubcategory) {
        return item.id;
    }

    registerChangeInProductSubcategories() {
        this.eventSubscriber = this.eventManager.subscribe('productSubcategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
