import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';
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
  currentSearch: string;

  constructor(
    protected mealProductService: MealProductService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.mealProductService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMealProduct[]>) => res.ok),
          map((res: HttpResponse<IMealProduct[]>) => res.body)
        )
        .subscribe((res: IMealProduct[]) => (this.mealProducts = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.mealProductService
      .query()
      .pipe(
        filter((res: HttpResponse<IMealProduct[]>) => res.ok),
        map((res: HttpResponse<IMealProduct[]>) => res.body)
      )
      .subscribe(
        (res: IMealProduct[]) => {
          this.mealProducts = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
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
