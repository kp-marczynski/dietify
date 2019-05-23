import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDietetician } from 'app/shared/model/dietetician.model';
import { AccountService } from 'app/core';
import { DieteticianService } from './dietetician.service';

@Component({
    selector: 'jhi-dietetician',
    templateUrl: './dietetician.component.html'
})
export class DieteticianComponent implements OnInit, OnDestroy {
    dieteticians: IDietetician[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected dieteticianService: DieteticianService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.dieteticianService
            .query()
            .pipe(
                filter((res: HttpResponse<IDietetician[]>) => res.ok),
                map((res: HttpResponse<IDietetician[]>) => res.body)
            )
            .subscribe(
                (res: IDietetician[]) => {
                    this.dieteticians = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDieteticians();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDietetician) {
        return item.id;
    }

    registerChangeInDieteticians() {
        this.eventSubscriber = this.eventManager.subscribe('dieteticianListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
