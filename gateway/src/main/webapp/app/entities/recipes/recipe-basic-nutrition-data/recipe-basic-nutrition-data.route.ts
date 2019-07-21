import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';
import { RecipeBasicNutritionDataComponent } from './recipe-basic-nutrition-data.component';
import { RecipeBasicNutritionDataDetailComponent } from './recipe-basic-nutrition-data-detail.component';
import { RecipeBasicNutritionDataUpdateComponent } from './recipe-basic-nutrition-data-update.component';
import { RecipeBasicNutritionDataDeletePopupComponent } from './recipe-basic-nutrition-data-delete-dialog.component';
import { IRecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

@Injectable({ providedIn: 'root' })
export class RecipeBasicNutritionDataResolve implements Resolve<IRecipeBasicNutritionData> {
  constructor(private service: RecipeBasicNutritionDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipeBasicNutritionData> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeBasicNutritionData>) => response.ok),
        map((recipeBasicNutritionData: HttpResponse<RecipeBasicNutritionData>) => recipeBasicNutritionData.body)
      );
    }
    return of(new RecipeBasicNutritionData());
  }
}

export const recipeBasicNutritionDataRoute: Routes = [
  {
    path: '',
    component: RecipeBasicNutritionDataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipeBasicNutritionDataDetailComponent,
    resolve: {
      recipeBasicNutritionData: RecipeBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipeBasicNutritionDataUpdateComponent,
    resolve: {
      recipeBasicNutritionData: RecipeBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipeBasicNutritionDataUpdateComponent,
    resolve: {
      recipeBasicNutritionData: RecipeBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const recipeBasicNutritionDataPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RecipeBasicNutritionDataDeletePopupComponent,
    resolve: {
      recipeBasicNutritionData: RecipeBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
