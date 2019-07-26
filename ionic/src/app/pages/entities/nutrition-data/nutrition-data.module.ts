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

import { NutritionDataPage } from './nutrition-data';
import { NutritionDataUpdatePage } from './nutrition-data-update';
import { NutritionData, NutritionDataService, NutritionDataDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class NutritionDataResolve implements Resolve<NutritionData> {
  constructor(private service: NutritionDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NutritionData> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionData>) => response.ok),
        map((nutritionData: HttpResponse<NutritionData>) => nutritionData.body)
      );
    }
    return of(new NutritionData());
  }
}

const routes: Routes = [
    {
      path: '',
      component: NutritionDataPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: NutritionDataUpdatePage,
      resolve: {
        data: NutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: NutritionDataDetailPage,
      resolve: {
        data: NutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: NutritionDataUpdatePage,
      resolve: {
        data: NutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        NutritionDataPage,
        NutritionDataUpdatePage,
        NutritionDataDetailPage
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
export class NutritionDataPageModule {
}
