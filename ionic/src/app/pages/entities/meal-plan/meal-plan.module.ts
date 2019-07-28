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

import { MealPlanPage } from './meal-plan';
import { MealPlanUpdatePage } from './meal-plan-update';
import { MealPlan, MealPlanService, MealPlanDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealPlanResolve implements Resolve<MealPlan> {
  constructor(private service: MealPlanService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealPlan> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealPlan>) => response.ok),
        map((mealPlan: HttpResponse<MealPlan>) => mealPlan.body)
      );
    }
    return of(new MealPlan());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealPlanPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealPlanUpdatePage,
      resolve: {
        data: MealPlanResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealPlanDetailPage,
      resolve: {
        data: MealPlanResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealPlanUpdatePage,
      resolve: {
        data: MealPlanResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealPlanPage,
        MealPlanUpdatePage,
        MealPlanDetailPage
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
export class MealPlanPageModule {
}
