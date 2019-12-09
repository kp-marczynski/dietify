import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';
import { AccountService } from 'app/core';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';

@Component({
  selector: 'jhi-recipe-unsuitable-for-diet',
  templateUrl: './recipe-unsuitable-for-diet.component.html'
})
export class RecipeUnsuitableForDietComponent implements OnInit, OnDestroy {
  recipeUnsuitableForDiets: IRecipeUnsuitableForDiet[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
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
      this.recipeUnsuitableForDietService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IRecipeUnsuitableForDiet[]>) => res.ok),
          map((res: HttpResponse<IRecipeUnsuitableForDiet[]>) => res.body)
        )
        .subscribe(
          (res: IRecipeUnsuitableForDiet[]) => (this.recipeUnsuitableForDiets = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.recipeUnsuitableForDietService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecipeUnsuitableForDiet[]>) => res.ok),
        map((res: HttpResponse<IRecipeUnsuitableForDiet[]>) => res.body)
      )
      .subscribe(
        (res: IRecipeUnsuitableForDiet[]) => {
          this.recipeUnsuitableForDiets = res;
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
    this.registerChangeInRecipeUnsuitableForDiets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipeUnsuitableForDiet) {
    return item.id;
  }

  registerChangeInRecipeUnsuitableForDiets() {
    this.eventSubscriber = this.eventManager.subscribe('recipeUnsuitableForDietListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
