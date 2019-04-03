import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeSuitableForDiet } from 'app/shared/model/recipe-suitable-for-diet.model';
import { AccountService } from 'app/core';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';

@Component({
    selector: 'jhi-recipe-suitable-for-diet',
    templateUrl: './recipe-suitable-for-diet.component.html'
})
export class RecipeSuitableForDietComponent implements OnInit, OnDestroy {
    recipeSuitableForDiets: IRecipeSuitableForDiet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected recipeSuitableForDietService: RecipeSuitableForDietService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.recipeSuitableForDietService
            .query()
            .pipe(
                filter((res: HttpResponse<IRecipeSuitableForDiet[]>) => res.ok),
                map((res: HttpResponse<IRecipeSuitableForDiet[]>) => res.body)
            )
            .subscribe(
                (res: IRecipeSuitableForDiet[]) => {
                    this.recipeSuitableForDiets = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRecipeSuitableForDiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecipeSuitableForDiet) {
        return item.id;
    }

    registerChangeInRecipeSuitableForDiets() {
        this.eventSubscriber = this.eventManager.subscribe('recipeSuitableForDietListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
