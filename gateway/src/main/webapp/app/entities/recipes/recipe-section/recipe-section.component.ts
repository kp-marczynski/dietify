import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { AccountService } from 'app/core';
import { RecipeSectionService } from './recipe-section.service';

@Component({
  selector: 'jhi-recipe-section',
  templateUrl: './recipe-section.component.html'
})
export class RecipeSectionComponent implements OnInit, OnDestroy {
  recipeSections: IRecipeSection[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected recipeSectionService: RecipeSectionService,
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
      this.recipeSectionService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IRecipeSection[]>) => res.ok),
          map((res: HttpResponse<IRecipeSection[]>) => res.body)
        )
        .subscribe((res: IRecipeSection[]) => (this.recipeSections = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.recipeSectionService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecipeSection[]>) => res.ok),
        map((res: HttpResponse<IRecipeSection[]>) => res.body)
      )
      .subscribe(
        (res: IRecipeSection[]) => {
          this.recipeSections = res;
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
    this.registerChangeInRecipeSections();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipeSection) {
    return item.id;
  }

  registerChangeInRecipeSections() {
    this.eventSubscriber = this.eventManager.subscribe('recipeSectionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
