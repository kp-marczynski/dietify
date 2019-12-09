import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';
import { RecipeUnsuitableForDietComponent } from './recipe-unsuitable-for-diet.component';
import { RecipeUnsuitableForDietDetailComponent } from './recipe-unsuitable-for-diet-detail.component';
import { RecipeUnsuitableForDietUpdateComponent } from './recipe-unsuitable-for-diet-update.component';
import { RecipeUnsuitableForDietDeletePopupComponent } from './recipe-unsuitable-for-diet-delete-dialog.component';
import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';

@Injectable({ providedIn: 'root' })
export class RecipeUnsuitableForDietResolve implements Resolve<IRecipeUnsuitableForDiet> {
  constructor(private service: RecipeUnsuitableForDietService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipeUnsuitableForDiet> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeUnsuitableForDiet>) => response.ok),
        map((recipeUnsuitableForDiet: HttpResponse<RecipeUnsuitableForDiet>) => recipeUnsuitableForDiet.body)
      );
    }
    return of(new RecipeUnsuitableForDiet());
  }
}

export const recipeUnsuitableForDietRoute: Routes = [
  {
    path: '',
    component: RecipeUnsuitableForDietComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeUnsuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipeUnsuitableForDietDetailComponent,
    resolve: {
      recipeUnsuitableForDiet: RecipeUnsuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeUnsuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipeUnsuitableForDietUpdateComponent,
    resolve: {
      recipeUnsuitableForDiet: RecipeUnsuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeUnsuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipeUnsuitableForDietUpdateComponent,
    resolve: {
      recipeUnsuitableForDiet: RecipeUnsuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeUnsuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const recipeUnsuitableForDietPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RecipeUnsuitableForDietDeletePopupComponent,
    resolve: {
      recipeUnsuitableForDiet: RecipeUnsuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeUnsuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
