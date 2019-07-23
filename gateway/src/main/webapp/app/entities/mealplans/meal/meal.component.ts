import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeal } from 'app/shared/model/mealplans/meal.model';
import { AccountService } from 'app/core';
import { MealService } from './meal.service';

@Component({
  selector: 'jhi-meal',
  templateUrl: './meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
  meals: IMeal[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealService: MealService,
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
      this.mealService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMeal[]>) => res.ok),
          map((res: HttpResponse<IMeal[]>) => res.body)
        )
        .subscribe((res: IMeal[]) => (this.meals = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.mealService
      .query()
      .pipe(
        filter((res: HttpResponse<IMeal[]>) => res.ok),
        map((res: HttpResponse<IMeal[]>) => res.body)
      )
      .subscribe(
        (res: IMeal[]) => {
          this.meals = res;
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
    this.registerChangeInMeals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMeal) {
    return item.id;
  }

  registerChangeInMeals() {
    this.eventSubscriber = this.eventManager.subscribe('mealListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
