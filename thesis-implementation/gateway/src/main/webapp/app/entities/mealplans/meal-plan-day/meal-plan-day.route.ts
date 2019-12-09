import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';
import { MealPlanDayComponent } from './meal-plan-day.component';
import { MealPlanDayDetailComponent } from './meal-plan-day-detail.component';
import { MealPlanDayUpdateComponent } from './meal-plan-day-update.component';
import { MealPlanDayDeletePopupComponent } from './meal-plan-day-delete-dialog.component';
import { IMealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';

@Injectable({ providedIn: 'root' })
export class MealPlanDayResolve implements Resolve<IMealPlanDay> {
  constructor(private service: MealPlanDayService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealPlanDay> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealPlanDay>) => response.ok),
        map((mealPlanDay: HttpResponse<MealPlanDay>) => mealPlanDay.body)
      );
    }
    return of(new MealPlanDay());
  }
}

export const mealPlanDayRoute: Routes = [
  {
    path: '',
    component: MealPlanDayComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealPlanDay.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MealPlanDayDetailComponent,
    resolve: {
      mealPlanDay: MealPlanDayResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealPlanDay.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MealPlanDayUpdateComponent,
    resolve: {
      mealPlanDay: MealPlanDayResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealPlanDay.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MealPlanDayUpdateComponent,
    resolve: {
      mealPlanDay: MealPlanDayResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealPlanDay.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mealPlanDayPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MealPlanDayDeletePopupComponent,
    resolve: {
      mealPlanDay: MealPlanDayResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealPlanDay.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
