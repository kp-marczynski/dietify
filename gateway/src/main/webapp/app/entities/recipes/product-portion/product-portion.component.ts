import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductPortion } from 'app/shared/model/recipes/product-portion.model';
import { AccountService } from 'app/core';
import { ProductPortionService } from './product-portion.service';

@Component({
  selector: 'jhi-product-portion',
  templateUrl: './product-portion.component.html'
})
export class ProductPortionComponent implements OnInit, OnDestroy {
  productPortions: IProductPortion[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected productPortionService: ProductPortionService,
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
      this.productPortionService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IProductPortion[]>) => res.ok),
          map((res: HttpResponse<IProductPortion[]>) => res.body)
        )
        .subscribe((res: IProductPortion[]) => (this.productPortions = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.productPortionService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductPortion[]>) => res.ok),
        map((res: HttpResponse<IProductPortion[]>) => res.body)
      )
      .subscribe(
        (res: IProductPortion[]) => {
          this.productPortions = res;
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
    this.registerChangeInProductPortions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductPortion) {
    return item.id;
  }

  registerChangeInProductPortions() {
    this.eventSubscriber = this.eventManager.subscribe('productPortionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
