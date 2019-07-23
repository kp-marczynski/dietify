import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKitchenAppliance } from 'app/shared/model/kitchen-appliance.model';
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

    constructor(
        protected kitchenApplianceService: KitchenApplianceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.kitchenApplianceService
            .query()
            .pipe(
                filter((res: HttpResponse<IKitchenAppliance[]>) => res.ok),
                map((res: HttpResponse<IKitchenAppliance[]>) => res.body)
            )
            .subscribe(
                (res: IKitchenAppliance[]) => {
                    this.kitchenAppliances = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
