import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';
import { AccountService } from 'app/core';
import { MealTypeTranslationService } from './meal-type-translation.service';

@Component({
  selector: 'jhi-meal-type-translation',
  templateUrl: './meal-type-translation.component.html'
})
export class MealTypeTranslationComponent implements OnInit, OnDestroy {
  mealTypeTranslations: IMealTypeTranslation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealTypeTranslationService: MealTypeTranslationService,
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
      this.mealTypeTranslationService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMealTypeTranslation[]>) => res.ok),
          map((res: HttpResponse<IMealTypeTranslation[]>) => res.body)
        )
        .subscribe(
          (res: IMealTypeTranslation[]) => (this.mealTypeTranslations = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.mealTypeTranslationService
      .query()
      .pipe(
        filter((res: HttpResponse<IMealTypeTranslation[]>) => res.ok),
        map((res: HttpResponse<IMealTypeTranslation[]>) => res.body)
      )
      .subscribe(
        (res: IMealTypeTranslation[]) => {
          this.mealTypeTranslations = res;
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
    this.registerChangeInMealTypeTranslations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMealTypeTranslation) {
    return item.id;
  }

  registerChangeInMealTypeTranslations() {
    this.eventSubscriber = this.eventManager.subscribe('mealTypeTranslationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
