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

import { MealPlanDayPage } from './meal-plan-day';
import { MealPlanDayUpdatePage } from './meal-plan-day-update';
import { MealPlanDay, MealPlanDayService, MealPlanDayDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealPlanDayResolve implements Resolve<MealPlanDay> {
  constructor(private service: MealPlanDayService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealPlanDay> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealPlanDay>) => response.ok),
        map((mealPlanDay: HttpResponse<MealPlanDay>) => mealPlanDay.body)
      );
    }
    return of(new MealPlanDay());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealPlanDayPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealPlanDayUpdatePage,
      resolve: {
        data: MealPlanDayResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealPlanDayDetailPage,
      resolve: {
        data: MealPlanDayResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealPlanDayUpdatePage,
      resolve: {
        data: MealPlanDayResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealPlanDayPage,
        MealPlanDayUpdatePage,
        MealPlanDayDetailPage
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
export class MealPlanDayPageModule {
}
