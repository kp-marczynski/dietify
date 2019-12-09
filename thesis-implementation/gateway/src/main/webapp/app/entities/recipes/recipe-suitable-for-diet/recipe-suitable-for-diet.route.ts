import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';
import { RecipeSuitableForDietComponent } from './recipe-suitable-for-diet.component';
import { RecipeSuitableForDietDetailComponent } from './recipe-suitable-for-diet-detail.component';
import { RecipeSuitableForDietUpdateComponent } from './recipe-suitable-for-diet-update.component';
import { RecipeSuitableForDietDeletePopupComponent } from './recipe-suitable-for-diet-delete-dialog.component';
import { IRecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';

@Injectable({ providedIn: 'root' })
export class RecipeSuitableForDietResolve implements Resolve<IRecipeSuitableForDiet> {
  constructor(private service: RecipeSuitableForDietService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipeSuitableForDiet> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeSuitableForDiet>) => response.ok),
        map((recipeSuitableForDiet: HttpResponse<RecipeSuitableForDiet>) => recipeSuitableForDiet.body)
      );
    }
    return of(new RecipeSuitableForDiet());
  }
}

export const recipeSuitableForDietRoute: Routes = [
  {
    path: '',
    component: RecipeSuitableForDietComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipeSuitableForDietDetailComponent,
    resolve: {
      recipeSuitableForDiet: RecipeSuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipeSuitableForDietUpdateComponent,
    resolve: {
      recipeSuitableForDiet: RecipeSuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipeSuitableForDietUpdateComponent,
    resolve: {
      recipeSuitableForDiet: RecipeSuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const recipeSuitableForDietPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RecipeSuitableForDietDeletePopupComponent,
    resolve: {
      recipeSuitableForDiet: RecipeSuitableForDietResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSuitableForDiet.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
