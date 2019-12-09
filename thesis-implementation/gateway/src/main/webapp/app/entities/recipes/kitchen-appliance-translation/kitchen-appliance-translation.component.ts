import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';
import { AccountService } from 'app/core';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';

@Component({
  selector: 'jhi-kitchen-appliance-translation',
  templateUrl: './kitchen-appliance-translation.component.html'
})
export class KitchenApplianceTranslationComponent implements OnInit, OnDestroy {
  kitchenApplianceTranslations: IKitchenApplianceTranslation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected kitchenApplianceTranslationService: KitchenApplianceTranslationService,
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
      this.kitchenApplianceTranslationService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IKitchenApplianceTranslation[]>) => res.ok),
          map((res: HttpResponse<IKitchenApplianceTranslation[]>) => res.body)
        )
        .subscribe(
          (res: IKitchenApplianceTranslation[]) => (this.kitchenApplianceTranslations = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.kitchenApplianceTranslationService
      .query()
      .pipe(
        filter((res: HttpResponse<IKitchenApplianceTranslation[]>) => res.ok),
        map((res: HttpResponse<IKitchenApplianceTranslation[]>) => res.body)
      )
      .subscribe(
        (res: IKitchenApplianceTranslation[]) => {
          this.kitchenApplianceTranslations = res;
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
    this.registerChangeInKitchenApplianceTranslations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IKitchenApplianceTranslation) {
    return item.id;
  }

  registerChangeInKitchenApplianceTranslations() {
    this.eventSubscriber = this.eventManager.subscribe('kitchenApplianceTranslationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
