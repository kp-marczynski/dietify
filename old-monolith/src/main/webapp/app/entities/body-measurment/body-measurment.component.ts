import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';
import { AccountService } from 'app/core';
import { BodyMeasurmentService } from './body-measurment.service';

@Component({
    selector: 'jhi-body-measurment',
    templateUrl: './body-measurment.component.html'
})
export class BodyMeasurmentComponent implements OnInit, OnDestroy {
    bodyMeasurments: IBodyMeasurment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected bodyMeasurmentService: BodyMeasurmentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.bodyMeasurmentService
            .query()
            .pipe(
                filter((res: HttpResponse<IBodyMeasurment[]>) => res.ok),
                map((res: HttpResponse<IBodyMeasurment[]>) => res.body)
            )
            .subscribe(
                (res: IBodyMeasurment[]) => {
                    this.bodyMeasurments = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBodyMeasurments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBodyMeasurment) {
        return item.id;
    }

    registerChangeInBodyMeasurments() {
        this.eventSubscriber = this.eventManager.subscribe('bodyMeasurmentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
