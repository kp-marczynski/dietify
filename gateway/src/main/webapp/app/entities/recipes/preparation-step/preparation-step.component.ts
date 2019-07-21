import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPreparationStep } from 'app/shared/model/recipes/preparation-step.model';
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
  currentSearch: string;

  constructor(
    protected preparationStepService: PreparationStepService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.preparationStepService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IPreparationStep[]>) => res.ok),
          map((res: HttpResponse<IPreparationStep[]>) => res.body)
        )
        .subscribe((res: IPreparationStep[]) => (this.preparationSteps = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.preparationStepService
      .query()
      .pipe(
        filter((res: HttpResponse<IPreparationStep[]>) => res.ok),
        map((res: HttpResponse<IPreparationStep[]>) => res.body)
      )
      .subscribe(
        (res: IPreparationStep[]) => {
          this.preparationSteps = res;
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
    this.registerChangeInPreparationSteps();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPreparationStep) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPreparationSteps() {
    this.eventSubscriber = this.eventManager.subscribe('preparationStepListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
