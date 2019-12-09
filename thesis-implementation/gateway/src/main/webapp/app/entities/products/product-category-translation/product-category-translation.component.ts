import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';
import { AccountService } from 'app/core';
import { ProductCategoryTranslationService } from './product-category-translation.service';

@Component({
  selector: 'jhi-product-category-translation',
  templateUrl: './product-category-translation.component.html'
})
export class ProductCategoryTranslationComponent implements OnInit, OnDestroy {
  productCategoryTranslations: IProductCategoryTranslation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected productCategoryTranslationService: ProductCategoryTranslationService,
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
      this.productCategoryTranslationService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IProductCategoryTranslation[]>) => res.ok),
          map((res: HttpResponse<IProductCategoryTranslation[]>) => res.body)
        )
        .subscribe(
          (res: IProductCategoryTranslation[]) => (this.productCategoryTranslations = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.productCategoryTranslationService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductCategoryTranslation[]>) => res.ok),
        map((res: HttpResponse<IProductCategoryTranslation[]>) => res.body)
      )
      .subscribe(
        (res: IProductCategoryTranslation[]) => {
          this.productCategoryTranslations = res;
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
    this.registerChangeInProductCategoryTranslations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductCategoryTranslation) {
    return item.id;
  }

  registerChangeInProductCategoryTranslations() {
    this.eventSubscriber = this.eventManager.subscribe('productCategoryTranslationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
