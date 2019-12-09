import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDietType } from 'app/shared/model/products/diet-type.model';
import { AccountService } from 'app/core';
import { DietTypeService } from './diet-type.service';

@Component({
  selector: 'jhi-diet-type',
  templateUrl: './diet-type.component.html'
})
export class DietTypeComponent implements OnInit, OnDestroy {
  dietTypes: IDietType[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected dietTypeService: DietTypeService,
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
      this.dietTypeService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IDietType[]>) => res.ok),
          map((res: HttpResponse<IDietType[]>) => res.body)
        )
        .subscribe((res: IDietType[]) => (this.dietTypes = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.dietTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IDietType[]>) => res.ok),
        map((res: HttpResponse<IDietType[]>) => res.body)
      )
      .subscribe(
        (res: IDietType[]) => {
          this.dietTypes = res;
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
    this.registerChangeInDietTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDietType) {
    return item.id;
  }

  registerChangeInDietTypes() {
    this.eventSubscriber = this.eventManager.subscribe('dietTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
