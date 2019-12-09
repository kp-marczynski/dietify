import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { AccountService } from 'app/core';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';

@Component({
  selector: 'jhi-nutrition-definition-translation',
  templateUrl: './nutrition-definition-translation.component.html'
})
export class NutritionDefinitionTranslationComponent implements OnInit, OnDestroy {
  nutritionDefinitionTranslations: INutritionDefinitionTranslation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected nutritionDefinitionTranslationService: NutritionDefinitionTranslationService,
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
      this.nutritionDefinitionTranslationService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<INutritionDefinitionTranslation[]>) => res.ok),
          map((res: HttpResponse<INutritionDefinitionTranslation[]>) => res.body)
        )
        .subscribe(
          (res: INutritionDefinitionTranslation[]) => (this.nutritionDefinitionTranslations = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.nutritionDefinitionTranslationService
      .query()
      .pipe(
        filter((res: HttpResponse<INutritionDefinitionTranslation[]>) => res.ok),
        map((res: HttpResponse<INutritionDefinitionTranslation[]>) => res.body)
      )
      .subscribe(
        (res: INutritionDefinitionTranslation[]) => {
          this.nutritionDefinitionTranslations = res;
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
    this.registerChangeInNutritionDefinitionTranslations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INutritionDefinitionTranslation) {
    return item.id;
  }

  registerChangeInNutritionDefinitionTranslations() {
    this.eventSubscriber = this.eventManager.subscribe('nutritionDefinitionTranslationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
