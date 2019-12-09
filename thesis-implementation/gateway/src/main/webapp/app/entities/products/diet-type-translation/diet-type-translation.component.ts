import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';
import { AccountService } from 'app/core';
import { DietTypeTranslationService } from './diet-type-translation.service';

@Component({
  selector: 'jhi-diet-type-translation',
  templateUrl: './diet-type-translation.component.html'
})
export class DietTypeTranslationComponent implements OnInit, OnDestroy {
  dietTypeTranslations: IDietTypeTranslation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected dietTypeTranslationService: DietTypeTranslationService,
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
      this.dietTypeTranslationService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IDietTypeTranslation[]>) => res.ok),
          map((res: HttpResponse<IDietTypeTranslation[]>) => res.body)
        )
        .subscribe(
          (res: IDietTypeTranslation[]) => (this.dietTypeTranslations = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.dietTypeTranslationService
      .query()
      .pipe(
        filter((res: HttpResponse<IDietTypeTranslation[]>) => res.ok),
        map((res: HttpResponse<IDietTypeTranslation[]>) => res.body)
      )
      .subscribe(
        (res: IDietTypeTranslation[]) => {
          this.dietTypeTranslations = res;
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
    this.registerChangeInDietTypeTranslations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDietTypeTranslation) {
    return item.id;
  }

  registerChangeInDietTypeTranslations() {
    this.eventSubscriber = this.eventManager.subscribe('dietTypeTranslationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
