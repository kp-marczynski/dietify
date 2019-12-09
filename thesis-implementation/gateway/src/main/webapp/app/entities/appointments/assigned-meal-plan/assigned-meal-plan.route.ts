import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';
import { AssignedMealPlanService } from './assigned-meal-plan.service';
import { AssignedMealPlanComponent } from './assigned-meal-plan.component';
import { AssignedMealPlanDetailComponent } from './assigned-meal-plan-detail.component';
import { AssignedMealPlanUpdateComponent } from './assigned-meal-plan-update.component';
import { AssignedMealPlanDeletePopupComponent } from './assigned-meal-plan-delete-dialog.component';
import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

@Injectable({ providedIn: 'root' })
export class AssignedMealPlanResolve implements Resolve<IAssignedMealPlan> {
  constructor(private service: AssignedMealPlanService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAssignedMealPlan> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AssignedMealPlan>) => response.ok),
        map((assignedMealPlan: HttpResponse<AssignedMealPlan>) => assignedMealPlan.body)
      );
    }
    return of(new AssignedMealPlan());
  }
}

export const assignedMealPlanRoute: Routes = [
  {
    path: '',
    component: AssignedMealPlanComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAssignedMealPlan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AssignedMealPlanDetailComponent,
    resolve: {
      assignedMealPlan: AssignedMealPlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAssignedMealPlan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AssignedMealPlanUpdateComponent,
    resolve: {
      assignedMealPlan: AssignedMealPlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAssignedMealPlan.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AssignedMealPlanUpdateComponent,
    resolve: {
      assignedMealPlan: AssignedMealPlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAssignedMealPlan.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const assignedMealPlanPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AssignedMealPlanDeletePopupComponent,
    resolve: {
      assignedMealPlan: AssignedMealPlanResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAssignedMealPlan.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
