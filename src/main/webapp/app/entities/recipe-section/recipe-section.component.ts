import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipeSection } from 'app/shared/model/recipe-section.model';
import { AccountService } from 'app/core';
import { RecipeSectionService } from './recipe-section.service';

@Component({
    selector: 'jhi-recipe-section',
    templateUrl: './recipe-section.component.html'
})
export class RecipeSectionComponent implements OnInit, OnDestroy {
    recipeSections: IRecipeSection[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected recipeSectionService: RecipeSectionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.recipeSectionService
            .query()
            .pipe(
                filter((res: HttpResponse<IRecipeSection[]>) => res.ok),
                map((res: HttpResponse<IRecipeSection[]>) => res.body)
            )
            .subscribe(
                (res: IRecipeSection[]) => {
                    this.recipeSections = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRecipeSections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecipeSection) {
        return item.id;
    }

    registerChangeInRecipeSections() {
        this.eventSubscriber = this.eventManager.subscribe('recipeSectionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
