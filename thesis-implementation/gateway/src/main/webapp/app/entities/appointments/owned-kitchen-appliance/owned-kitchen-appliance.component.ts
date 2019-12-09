import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';
import { AccountService } from 'app/core';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';

@Component({
  selector: 'jhi-owned-kitchen-appliance',
  templateUrl: './owned-kitchen-appliance.component.html'
})
export class OwnedKitchenApplianceComponent implements OnInit, OnDestroy {
  ownedKitchenAppliances: IOwnedKitchenAppliance[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected ownedKitchenApplianceService: OwnedKitchenApplianceService,
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
      this.ownedKitchenApplianceService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IOwnedKitchenAppliance[]>) => res.ok),
          map((res: HttpResponse<IOwnedKitchenAppliance[]>) => res.body)
        )
        .subscribe(
          (res: IOwnedKitchenAppliance[]) => (this.ownedKitchenAppliances = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.ownedKitchenApplianceService
      .query()
      .pipe(
        filter((res: HttpResponse<IOwnedKitchenAppliance[]>) => res.ok),
        map((res: HttpResponse<IOwnedKitchenAppliance[]>) => res.body)
      )
      .subscribe(
        (res: IOwnedKitchenAppliance[]) => {
          this.ownedKitchenAppliances = res;
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
    this.registerChangeInOwnedKitchenAppliances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOwnedKitchenAppliance) {
    return item.id;
  }

  registerChangeInOwnedKitchenAppliances() {
    this.eventSubscriber = this.eventManager.subscribe('ownedKitchenApplianceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
