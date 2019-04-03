import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPreparationStep } from 'app/shared/model/preparation-step.model';
import { AccountService } from 'app/core';
import { PreparationStepService } from './preparation-step.service';

@Component({
    selector: 'jhi-preparation-step',
    templateUrl: './preparation-step.component.html'
})
export class PreparationStepComponent implements OnInit, OnDestroy {
    preparationSteps: IPreparationStep[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected preparationStepService: PreparationStepService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.preparationStepService
            .query()
            .pipe(
                filter((res: HttpResponse<IPreparationStep[]>) => res.ok),
                map((res: HttpResponse<IPreparationStep[]>) => res.body)
            )
            .subscribe(
                (res: IPreparationStep[]) => {
                    this.preparationSteps = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPreparationSteps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPreparationStep) {
        return item.id;
    }

    registerChangeInPreparationSteps() {
        this.eventSubscriber = this.eventManager.subscribe('preparationStepListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
