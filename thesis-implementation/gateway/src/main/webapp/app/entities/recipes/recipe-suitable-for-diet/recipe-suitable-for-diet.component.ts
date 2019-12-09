import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';
import { AccountService } from 'app/core';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';

@Component({
  selector: 'jhi-recipe-suitable-for-diet',
  templateUrl: './recipe-suitable-for-diet.component.html'
})
export class RecipeSuitableForDietComponent implements OnInit, OnDestroy {
  recipeSuitableForDiets: IRecipeSuitableForDiet[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected recipeSuitableForDietService: RecipeSuitableForDietService,
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
      this.recipeSuitableForDietService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IRecipeSuitableForDiet[]>) => res.ok),
          map((res: HttpResponse<IRecipeSuitableForDiet[]>) => res.body)
        )
        .subscribe(
          (res: IRecipeSuitableForDiet[]) => (this.recipeSuitableForDiets = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.recipeSuitableForDietService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecipeSuitableForDiet[]>) => res.ok),
        map((res: HttpResponse<IRecipeSuitableForDiet[]>) => res.body)
      )
      .subscribe(
        (res: IRecipeSuitableForDiet[]) => {
          this.recipeSuitableForDiets = res;
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
    this.registerChangeInRecipeSuitableForDiets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipeSuitableForDiet) {
    return item.id;
  }

  registerChangeInRecipeSuitableForDiets() {
    this.eventSubscriber = this.eventManager.subscribe('recipeSuitableForDietListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
