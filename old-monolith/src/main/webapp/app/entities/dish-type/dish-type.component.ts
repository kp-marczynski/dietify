import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDishType } from 'app/shared/model/dish-type.model';
import { AccountService } from 'app/core';
import { DishTypeService } from './dish-type.service';

@Component({
    selector: 'jhi-dish-type',
    templateUrl: './dish-type.component.html'
})
export class DishTypeComponent implements OnInit, OnDestroy {
    dishTypes: IDishType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected dishTypeService: DishTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.dishTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IDishType[]>) => res.ok),
                map((res: HttpResponse<IDishType[]>) => res.body)
            )
            .subscribe(
                (res: IDishType[]) => {
                    this.dishTypes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDishTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDishType) {
        return item.id;
    }

    registerChangeInDishTypes() {
        this.eventSubscriber = this.eventManager.subscribe('dishTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
