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

import { MealPage } from './meal';
import { MealUpdatePage } from './meal-update';
import { Meal, MealService, MealDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealResolve implements Resolve<Meal> {
  constructor(private service: MealService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Meal> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Meal>) => response.ok),
        map((meal: HttpResponse<Meal>) => meal.body)
      );
    }
    return of(new Meal());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealUpdatePage,
      resolve: {
        data: MealResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealDetailPage,
      resolve: {
        data: MealResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealUpdatePage,
      resolve: {
        data: MealResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealPage,
        MealUpdatePage,
        MealDetailPage
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
export class MealPageModule {
}
