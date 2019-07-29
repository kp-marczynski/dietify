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

import { MealPlanUnsuitableForDietPage } from './meal-plan-unsuitable-for-diet';
import { MealPlanUnsuitableForDietUpdatePage } from './meal-plan-unsuitable-for-diet-update';
import { MealPlanUnsuitableForDiet, MealPlanUnsuitableForDietService, MealPlanUnsuitableForDietDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealPlanUnsuitableForDietResolve implements Resolve<MealPlanUnsuitableForDiet> {
  constructor(private service: MealPlanUnsuitableForDietService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealPlanUnsuitableForDiet> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealPlanUnsuitableForDiet>) => response.ok),
        map((mealPlanUnsuitableForDiet: HttpResponse<MealPlanUnsuitableForDiet>) => mealPlanUnsuitableForDiet.body)
      );
    }
    return of(new MealPlanUnsuitableForDiet());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealPlanUnsuitableForDietPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealPlanUnsuitableForDietUpdatePage,
      resolve: {
        data: MealPlanUnsuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealPlanUnsuitableForDietDetailPage,
      resolve: {
        data: MealPlanUnsuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealPlanUnsuitableForDietUpdatePage,
      resolve: {
        data: MealPlanUnsuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealPlanUnsuitableForDietPage,
        MealPlanUnsuitableForDietUpdatePage,
        MealPlanUnsuitableForDietDetailPage
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
export class MealPlanUnsuitableForDietPageModule {
}
