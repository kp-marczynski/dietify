import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';
import { AccountService } from 'app/core';
import { DishTypeTranslationService } from './dish-type-translation.service';

@Component({
  selector: 'jhi-dish-type-translation',
  templateUrl: './dish-type-translation.component.html'
})
export class DishTypeTranslationComponent implements OnInit, OnDestroy {
  dishTypeTranslations: IDishTypeTranslation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected dishTypeTranslationService: DishTypeTranslationService,
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
      this.dishTypeTranslationService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IDishTypeTranslation[]>) => res.ok),
          map((res: HttpResponse<IDishTypeTranslation[]>) => res.body)
        )
        .subscribe(
          (res: IDishTypeTranslation[]) => (this.dishTypeTranslations = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.dishTypeTranslationService
      .query()
      .pipe(
        filter((res: HttpResponse<IDishTypeTranslation[]>) => res.ok),
        map((res: HttpResponse<IDishTypeTranslation[]>) => res.body)
      )
      .subscribe(
        (res: IDishTypeTranslation[]) => {
          this.dishTypeTranslations = res;
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
    this.registerChangeInDishTypeTranslations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDishTypeTranslation) {
    return item.id;
  }

  registerChangeInDishTypeTranslations() {
    this.eventSubscriber = this.eventManager.subscribe('dishTypeTranslationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
