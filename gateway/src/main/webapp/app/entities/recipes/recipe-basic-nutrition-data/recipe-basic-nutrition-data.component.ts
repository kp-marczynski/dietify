import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { AccountService } from 'app/core';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';

@Component({
  selector: 'jhi-recipe-basic-nutrition-data',
  templateUrl: './recipe-basic-nutrition-data.component.html'
})
export class RecipeBasicNutritionDataComponent implements OnInit, OnDestroy {
  recipeBasicNutritionData: IRecipeBasicNutritionData[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
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
      this.recipeBasicNutritionDataService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IRecipeBasicNutritionData[]>) => res.ok),
          map((res: HttpResponse<IRecipeBasicNutritionData[]>) => res.body)
        )
        .subscribe(
          (res: IRecipeBasicNutritionData[]) => (this.recipeBasicNutritionData = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.recipeBasicNutritionDataService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecipeBasicNutritionData[]>) => res.ok),
        map((res: HttpResponse<IRecipeBasicNutritionData[]>) => res.body)
      )
      .subscribe(
        (res: IRecipeBasicNutritionData[]) => {
          this.recipeBasicNutritionData = res;
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
    this.registerChangeInRecipeBasicNutritionData();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipeBasicNutritionData) {
    return item.id;
  }

  registerChangeInRecipeBasicNutritionData() {
    this.eventSubscriber = this.eventManager.subscribe('recipeBasicNutritionDataListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
