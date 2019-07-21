import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';
import { RecipeSectionComponent } from './recipe-section.component';
import { RecipeSectionDetailComponent } from './recipe-section-detail.component';
import { RecipeSectionUpdateComponent } from './recipe-section-update.component';
import { RecipeSectionDeletePopupComponent } from './recipe-section-delete-dialog.component';
import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';

@Injectable({ providedIn: 'root' })
export class RecipeSectionResolve implements Resolve<IRecipeSection> {
  constructor(private service: RecipeSectionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipeSection> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeSection>) => response.ok),
        map((recipeSection: HttpResponse<RecipeSection>) => recipeSection.body)
      );
    }
    return of(new RecipeSection());
  }
}

export const recipeSectionRoute: Routes = [
  {
    path: '',
    component: RecipeSectionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSection.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipeSectionDetailComponent,
    resolve: {
      recipeSection: RecipeSectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSection.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipeSectionUpdateComponent,
    resolve: {
      recipeSection: RecipeSectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSection.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipeSectionUpdateComponent,
    resolve: {
      recipeSection: RecipeSectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSection.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const recipeSectionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RecipeSectionDeletePopupComponent,
    resolve: {
      recipeSection: RecipeSectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesRecipeSection.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
