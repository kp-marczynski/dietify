import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';
import { AccountService } from 'app/core';
import { BodyMeasurementService } from './body-measurement.service';

@Component({
  selector: 'jhi-body-measurement',
  templateUrl: './body-measurement.component.html'
})
export class BodyMeasurementComponent implements OnInit, OnDestroy {
  bodyMeasurements: IBodyMeasurement[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected bodyMeasurementService: BodyMeasurementService,
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
      this.bodyMeasurementService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IBodyMeasurement[]>) => res.ok),
          map((res: HttpResponse<IBodyMeasurement[]>) => res.body)
        )
        .subscribe((res: IBodyMeasurement[]) => (this.bodyMeasurements = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.bodyMeasurementService
      .query()
      .pipe(
        filter((res: HttpResponse<IBodyMeasurement[]>) => res.ok),
        map((res: HttpResponse<IBodyMeasurement[]>) => res.body)
      )
      .subscribe(
        (res: IBodyMeasurement[]) => {
          this.bodyMeasurements = res;
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
    this.registerChangeInBodyMeasurements();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBodyMeasurement) {
    return item.id;
  }

  registerChangeInBodyMeasurements() {
    this.eventSubscriber = this.eventManager.subscribe('bodyMeasurementListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
