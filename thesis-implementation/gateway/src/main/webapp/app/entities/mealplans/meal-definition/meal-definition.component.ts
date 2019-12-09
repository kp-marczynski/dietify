import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealDefinition } from 'app/shared/model/mealplans/meal-definition.model';
import { AccountService } from 'app/core';
import { MealDefinitionService } from './meal-definition.service';

@Component({
  selector: 'jhi-meal-definition',
  templateUrl: './meal-definition.component.html'
})
export class MealDefinitionComponent implements OnInit, OnDestroy {
  mealDefinitions: IMealDefinition[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealDefinitionService: MealDefinitionService,
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
      this.mealDefinitionService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMealDefinition[]>) => res.ok),
          map((res: HttpResponse<IMealDefinition[]>) => res.body)
        )
        .subscribe((res: IMealDefinition[]) => (this.mealDefinitions = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.mealDefinitionService
      .query()
      .pipe(
        filter((res: HttpResponse<IMealDefinition[]>) => res.ok),
        map((res: HttpResponse<IMealDefinition[]>) => res.body)
      )
      .subscribe(
        (res: IMealDefinition[]) => {
          this.mealDefinitions = res;
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
    this.registerChangeInMealDefinitions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMealDefinition) {
    return item.id;
  }

  registerChangeInMealDefinitions() {
    this.eventSubscriber = this.eventManager.subscribe('mealDefinitionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
