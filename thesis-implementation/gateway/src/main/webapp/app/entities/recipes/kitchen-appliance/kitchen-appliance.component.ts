import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { AccountService } from 'app/core';
import { KitchenApplianceService } from './kitchen-appliance.service';

@Component({
  selector: 'jhi-kitchen-appliance',
  templateUrl: './kitchen-appliance.component.html'
})
export class KitchenApplianceComponent implements OnInit, OnDestroy {
  kitchenAppliances: IKitchenAppliance[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected kitchenApplianceService: KitchenApplianceService,
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
      this.kitchenApplianceService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IKitchenAppliance[]>) => res.ok),
          map((res: HttpResponse<IKitchenAppliance[]>) => res.body)
        )
        .subscribe((res: IKitchenAppliance[]) => (this.kitchenAppliances = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.kitchenApplianceService
      .query()
      .pipe(
        filter((res: HttpResponse<IKitchenAppliance[]>) => res.ok),
        map((res: HttpResponse<IKitchenAppliance[]>) => res.body)
      )
      .subscribe(
        (res: IKitchenAppliance[]) => {
          this.kitchenAppliances = res;
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
    this.registerChangeInKitchenAppliances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IKitchenAppliance) {
    return item.id;
  }

  registerChangeInKitchenAppliances() {
    this.eventSubscriber = this.eventManager.subscribe('kitchenApplianceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
