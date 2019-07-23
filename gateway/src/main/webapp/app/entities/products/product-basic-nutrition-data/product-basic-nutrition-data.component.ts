import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { AccountService } from 'app/core';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';

@Component({
  selector: 'jhi-product-basic-nutrition-data',
  templateUrl: './product-basic-nutrition-data.component.html'
})
export class ProductBasicNutritionDataComponent implements OnInit, OnDestroy {
  productBasicNutritionData: IProductBasicNutritionData[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected productBasicNutritionDataService: ProductBasicNutritionDataService,
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
      this.productBasicNutritionDataService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IProductBasicNutritionData[]>) => res.ok),
          map((res: HttpResponse<IProductBasicNutritionData[]>) => res.body)
        )
        .subscribe(
          (res: IProductBasicNutritionData[]) => (this.productBasicNutritionData = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.productBasicNutritionDataService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductBasicNutritionData[]>) => res.ok),
        map((res: HttpResponse<IProductBasicNutritionData[]>) => res.body)
      )
      .subscribe(
        (res: IProductBasicNutritionData[]) => {
          this.productBasicNutritionData = res;
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
    this.registerChangeInProductBasicNutritionData();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductBasicNutritionData) {
    return item.id;
  }

  registerChangeInProductBasicNutritionData() {
    this.eventSubscriber = this.eventManager.subscribe('productBasicNutritionDataListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
