import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { AssignedMealPlanPage } from './assigned-meal-plan';
import { AssignedMealPlanUpdatePage } from './assigned-meal-plan-update';
import { AssignedMealPlan, AssignedMealPlanService, AssignedMealPlanDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class AssignedMealPlanResolve implements Resolve<AssignedMealPlan> {
  constructor(private service: AssignedMealPlanService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssignedMealPlan> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AssignedMealPlan>) => response.ok),
        map((assignedMealPlan: HttpResponse<AssignedMealPlan>) => assignedMealPlan.body)
      );
    }
    return of(new AssignedMealPlan());
  }
}

const routes: Routes = [
    {
      path: '',
      component: AssignedMealPlanPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: AssignedMealPlanUpdatePage,
      resolve: {
        data: AssignedMealPlanResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: AssignedMealPlanDetailPage,
      resolve: {
        data: AssignedMealPlanResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: AssignedMealPlanUpdatePage,
      resolve: {
        data: AssignedMealPlanResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        AssignedMealPlanPage,
        AssignedMealPlanUpdatePage,
        AssignedMealPlanDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ]
})
export class AssignedMealPlanPageModule {
}
