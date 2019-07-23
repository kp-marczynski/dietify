import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';
import { AccountService } from 'app/core';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';

@Component({
  selector: 'jhi-meal-plan-suitable-for-diet',
  templateUrl: './meal-plan-suitable-for-diet.component.html'
})
export class MealPlanSuitableForDietComponent implements OnInit, OnDestroy {
  mealPlanSuitableForDiets: IMealPlanSuitableForDiet[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealPlanSuitableForDietService: MealPlanSuitableForDietService,
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
      this.mealPlanSuitableForDietService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMealPlanSuitableForDiet[]>) => res.ok),
          map((res: HttpResponse<IMealPlanSuitableForDiet[]>) => res.body)
        )
        .subscribe(
          (res: IMealPlanSuitableForDiet[]) => (this.mealPlanSuitableForDiets = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.mealPlanSuitableForDietService
      .query()
      .pipe(
        filter((res: HttpResponse<IMealPlanSuitableForDiet[]>) => res.ok),
        map((res: HttpResponse<IMealPlanSuitableForDiet[]>) => res.body)
      )
      .subscribe(
        (res: IMealPlanSuitableForDiet[]) => {
          this.mealPlanSuitableForDiets = res;
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
    this.registerChangeInMealPlanSuitableForDiets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMealPlanSuitableForDiet) {
    return item.id;
  }

  registerChangeInMealPlanSuitableForDiets() {
    this.eventSubscriber = this.eventManager.subscribe('mealPlanSuitableForDietListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
