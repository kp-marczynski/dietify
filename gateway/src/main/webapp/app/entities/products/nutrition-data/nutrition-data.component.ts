import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INutritionData } from 'app/shared/model/products/nutrition-data.model';
import { AccountService } from 'app/core';
import { NutritionDataService } from './nutrition-data.service';

@Component({
  selector: 'jhi-nutrition-data',
  templateUrl: './nutrition-data.component.html'
})
export class NutritionDataComponent implements OnInit, OnDestroy {
  nutritionData: INutritionData[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected nutritionDataService: NutritionDataService,
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
      this.nutritionDataService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<INutritionData[]>) => res.ok),
          map((res: HttpResponse<INutritionData[]>) => res.body)
        )
        .subscribe((res: INutritionData[]) => (this.nutritionData = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.nutritionDataService
      .query()
      .pipe(
        filter((res: HttpResponse<INutritionData[]>) => res.ok),
        map((res: HttpResponse<INutritionData[]>) => res.body)
      )
      .subscribe(
        (res: INutritionData[]) => {
          this.nutritionData = res;
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
    this.registerChangeInNutritionData();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INutritionData) {
    return item.id;
  }

  registerChangeInNutritionData() {
    this.eventSubscriber = this.eventManager.subscribe('nutritionDataListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
