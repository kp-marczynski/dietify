import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
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
  currentSearch: string;

  constructor(
    protected productSubcategoryService: ProductSubcategoryService,
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
      this.productSubcategoryService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IProductSubcategory[]>) => res.ok),
          map((res: HttpResponse<IProductSubcategory[]>) => res.body)
        )
        .subscribe(
          (res: IProductSubcategory[]) => (this.productSubcategories = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.productSubcategoryService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductSubcategory[]>) => res.ok),
        map((res: HttpResponse<IProductSubcategory[]>) => res.body)
      )
      .subscribe(
        (res: IProductSubcategory[]) => {
          this.productSubcategories = res;
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
