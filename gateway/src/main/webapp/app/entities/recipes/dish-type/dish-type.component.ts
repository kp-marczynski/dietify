import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDishType } from 'app/shared/model/recipes/dish-type.model';
import { AccountService } from 'app/core';
import { DishTypeService } from './dish-type.service';

@Component({
  selector: 'jhi-dish-type',
  templateUrl: './dish-type.component.html'
})
export class DishTypeComponent implements OnInit, OnDestroy {
  dishTypes: IDishType[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected dishTypeService: DishTypeService,
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
      this.dishTypeService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IDishType[]>) => res.ok),
          map((res: HttpResponse<IDishType[]>) => res.body)
        )
        .subscribe((res: IDishType[]) => (this.dishTypes = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.dishTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IDishType[]>) => res.ok),
        map((res: HttpResponse<IDishType[]>) => res.body)
      )
      .subscribe(
        (res: IDishType[]) => {
          this.dishTypes = res;
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
    this.registerChangeInDishTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDishType) {
    return item.id;
  }

  registerChangeInDishTypes() {
    this.eventSubscriber = this.eventManager.subscribe('dishTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
