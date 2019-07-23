import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ILandingPageCard } from 'app/shared/model/landing-page-card.model';
import { AccountService } from 'app/core';
import { LandingPageCardService } from './landing-page-card.service';

@Component({
  selector: 'jhi-landing-page-card',
  templateUrl: './landing-page-card.component.html'
})
export class LandingPageCardComponent implements OnInit, OnDestroy {
  landingPageCards: ILandingPageCard[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected landingPageCardService: LandingPageCardService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.landingPageCardService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ILandingPageCard[]>) => res.ok),
          map((res: HttpResponse<ILandingPageCard[]>) => res.body)
        )
        .subscribe((res: ILandingPageCard[]) => (this.landingPageCards = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.landingPageCardService
      .query()
      .pipe(
        filter((res: HttpResponse<ILandingPageCard[]>) => res.ok),
        map((res: HttpResponse<ILandingPageCard[]>) => res.body)
      )
      .subscribe(
        (res: ILandingPageCard[]) => {
          this.landingPageCards = res;
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
    this.registerChangeInLandingPageCards();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILandingPageCard) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInLandingPageCards() {
    this.eventSubscriber = this.eventManager.subscribe('landingPageCardListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
