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

import { MealTypePage } from './meal-type';
import { MealTypeUpdatePage } from './meal-type-update';
import { MealType, MealTypeService, MealTypeDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealTypeResolve implements Resolve<MealType> {
  constructor(private service: MealTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealType> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealType>) => response.ok),
        map((mealType: HttpResponse<MealType>) => mealType.body)
      );
    }
    return of(new MealType());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealTypePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealTypeUpdatePage,
      resolve: {
        data: MealTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealTypeDetailPage,
      resolve: {
        data: MealTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealTypeUpdatePage,
      resolve: {
        data: MealTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealTypePage,
        MealTypeUpdatePage,
        MealTypeDetailPage
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
export class MealTypePageModule {
}
