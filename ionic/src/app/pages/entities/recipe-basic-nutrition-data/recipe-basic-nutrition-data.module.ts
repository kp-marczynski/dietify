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

import { RecipeBasicNutritionDataPage } from './recipe-basic-nutrition-data';
import { RecipeBasicNutritionDataUpdatePage } from './recipe-basic-nutrition-data-update';
import { RecipeBasicNutritionData, RecipeBasicNutritionDataService, RecipeBasicNutritionDataDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RecipeBasicNutritionDataResolve implements Resolve<RecipeBasicNutritionData> {
  constructor(private service: RecipeBasicNutritionDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeBasicNutritionData> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeBasicNutritionData>) => response.ok),
        map((recipeBasicNutritionData: HttpResponse<RecipeBasicNutritionData>) => recipeBasicNutritionData.body)
      );
    }
    return of(new RecipeBasicNutritionData());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RecipeBasicNutritionDataPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RecipeBasicNutritionDataUpdatePage,
      resolve: {
        data: RecipeBasicNutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RecipeBasicNutritionDataDetailPage,
      resolve: {
        data: RecipeBasicNutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RecipeBasicNutritionDataUpdatePage,
      resolve: {
        data: RecipeBasicNutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RecipeBasicNutritionDataPage,
        RecipeBasicNutritionDataUpdatePage,
        RecipeBasicNutritionDataDetailPage
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
export class RecipeBasicNutritionDataPageModule {
}
