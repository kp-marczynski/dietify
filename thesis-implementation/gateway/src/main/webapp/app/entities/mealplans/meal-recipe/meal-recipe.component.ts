import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';
import { AccountService } from 'app/core';
import { MealRecipeService } from './meal-recipe.service';

@Component({
  selector: 'jhi-meal-recipe',
  templateUrl: './meal-recipe.component.html'
})
export class MealRecipeComponent implements OnInit, OnDestroy {
  mealRecipes: IMealRecipe[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealRecipeService: MealRecipeService,
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
      this.mealRecipeService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IMealRecipe[]>) => res.ok),
          map((res: HttpResponse<IMealRecipe[]>) => res.body)
        )
        .subscribe((res: IMealRecipe[]) => (this.mealRecipes = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.mealRecipeService
      .query()
      .pipe(
        filter((res: HttpResponse<IMealRecipe[]>) => res.ok),
        map((res: HttpResponse<IMealRecipe[]>) => res.body)
      )
      .subscribe(
        (res: IMealRecipe[]) => {
          this.mealRecipes = res;
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
    this.registerChangeInMealRecipes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMealRecipe) {
    return item.id;
  }

  registerChangeInMealRecipes() {
    this.eventSubscriber = this.eventManager.subscribe('mealRecipeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
