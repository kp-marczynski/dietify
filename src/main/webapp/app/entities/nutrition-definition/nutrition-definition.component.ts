import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INutritionDefinition } from 'app/shared/model/nutrition-definition.model';
import { AccountService } from 'app/core';
import { NutritionDefinitionService } from './nutrition-definition.service';

@Component({
    selector: 'jhi-nutrition-definition',
    templateUrl: './nutrition-definition.component.html'
})
export class NutritionDefinitionComponent implements OnInit, OnDestroy {
    nutritionDefinitions: INutritionDefinition[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected nutritionDefinitionService: NutritionDefinitionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.nutritionDefinitionService
            .query()
            .pipe(
                filter((res: HttpResponse<INutritionDefinition[]>) => res.ok),
                map((res: HttpResponse<INutritionDefinition[]>) => res.body)
            )
            .subscribe(
                (res: INutritionDefinition[]) => {
                    this.nutritionDefinitions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNutritionDefinitions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INutritionDefinition) {
        return item.id;
    }

    registerChangeInNutritionDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe('nutritionDefinitionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
