import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUserExtraInfo } from 'app/shared/model/user-extra-info.model';
import { AccountService } from 'app/core';
import { UserExtraInfoService } from './user-extra-info.service';

@Component({
  selector: 'jhi-user-extra-info',
  templateUrl: './user-extra-info.component.html'
})
export class UserExtraInfoComponent implements OnInit, OnDestroy {
  userExtraInfos: IUserExtraInfo[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected userExtraInfoService: UserExtraInfoService,
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
      this.userExtraInfoService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IUserExtraInfo[]>) => res.ok),
          map((res: HttpResponse<IUserExtraInfo[]>) => res.body)
        )
        .subscribe((res: IUserExtraInfo[]) => (this.userExtraInfos = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.userExtraInfoService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserExtraInfo[]>) => res.ok),
        map((res: HttpResponse<IUserExtraInfo[]>) => res.body)
      )
      .subscribe(
        (res: IUserExtraInfo[]) => {
          this.userExtraInfos = res;
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
    this.registerChangeInUserExtraInfos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserExtraInfo) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInUserExtraInfos() {
    this.eventSubscriber = this.eventManager.subscribe('userExtraInfoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
