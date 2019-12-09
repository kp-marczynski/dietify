import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { AccountService } from 'app/core';
import { MealTypeService } from './meal-type.service';

@Component({
  selector: 'jhi-meal-type',
  templateUrl: './meal-type.component.html'
})
export class MealTypeComponent implements OnInit, OnDestroy {
  mealTypes: IMealType[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealTypeService: MealTypeService,
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
      this.mealTypeService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMealType[]>) => res.ok),
          map((res: HttpResponse<IMealType[]>) => res.body)
        )
        .subscribe((res: IMealType[]) => (this.mealTypes = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.mealTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IMealType[]>) => res.ok),
        map((res: HttpResponse<IMealType[]>) => res.body)
      )
      .subscribe(
        (res: IMealType[]) => {
          this.mealTypes = res;
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
    this.registerChangeInMealTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMealType) {
    return item.id;
  }

  registerChangeInMealTypes() {
    this.eventSubscriber = this.eventManager.subscribe('mealTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
