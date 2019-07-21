import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';
import { AccountService } from 'app/core';
import { AssignedMealPlanService } from './assigned-meal-plan.service';

@Component({
  selector: 'jhi-assigned-meal-plan',
  templateUrl: './assigned-meal-plan.component.html'
})
export class AssignedMealPlanComponent implements OnInit, OnDestroy {
  assignedMealPlans: IAssignedMealPlan[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected assignedMealPlanService: AssignedMealPlanService,
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
      this.assignedMealPlanService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IAssignedMealPlan[]>) => res.ok),
          map((res: HttpResponse<IAssignedMealPlan[]>) => res.body)
        )
        .subscribe((res: IAssignedMealPlan[]) => (this.assignedMealPlans = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.assignedMealPlanService
      .query()
      .pipe(
        filter((res: HttpResponse<IAssignedMealPlan[]>) => res.ok),
        map((res: HttpResponse<IAssignedMealPlan[]>) => res.body)
      )
      .subscribe(
        (res: IAssignedMealPlan[]) => {
          this.assignedMealPlans = res;
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
    this.registerChangeInAssignedMealPlans();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAssignedMealPlan) {
    return item.id;
  }

  registerChangeInAssignedMealPlans() {
    this.eventSubscriber = this.eventManager.subscribe('assignedMealPlanListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
