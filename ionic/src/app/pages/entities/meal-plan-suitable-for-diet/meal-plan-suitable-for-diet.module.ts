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

import { MealPlanSuitableForDietPage } from './meal-plan-suitable-for-diet';
import { MealPlanSuitableForDietUpdatePage } from './meal-plan-suitable-for-diet-update';
import { MealPlanSuitableForDiet, MealPlanSuitableForDietService, MealPlanSuitableForDietDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealPlanSuitableForDietResolve implements Resolve<MealPlanSuitableForDiet> {
  constructor(private service: MealPlanSuitableForDietService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealPlanSuitableForDiet> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealPlanSuitableForDiet>) => response.ok),
        map((mealPlanSuitableForDiet: HttpResponse<MealPlanSuitableForDiet>) => mealPlanSuitableForDiet.body)
      );
    }
    return of(new MealPlanSuitableForDiet());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealPlanSuitableForDietPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealPlanSuitableForDietUpdatePage,
      resolve: {
        data: MealPlanSuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealPlanSuitableForDietDetailPage,
      resolve: {
        data: MealPlanSuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealPlanSuitableForDietUpdatePage,
      resolve: {
        data: MealPlanSuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealPlanSuitableForDietPage,
        MealPlanSuitableForDietUpdatePage,
        MealPlanSuitableForDietDetailPage
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
export class MealPlanSuitableForDietPageModule {
}
