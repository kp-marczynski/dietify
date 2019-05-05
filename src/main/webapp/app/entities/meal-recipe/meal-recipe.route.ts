import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealRecipe } from 'app/shared/model/meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';
import { MealRecipeComponent } from './meal-recipe.component';
import { MealRecipeDetailComponent } from './meal-recipe-detail.component';
import { MealRecipeUpdateComponent } from './meal-recipe-update.component';
import { MealRecipeDeletePopupComponent } from './meal-recipe-delete-dialog.component';
import { IMealRecipe } from 'app/shared/model/meal-recipe.model';

@Injectable({ providedIn: 'root' })
export class MealRecipeResolve implements Resolve<IMealRecipe> {
    constructor(private service: MealRecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealRecipe> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MealRecipe>) => response.ok),
                map((mealRecipe: HttpResponse<MealRecipe>) => mealRecipe.body)
            );
        }
        return of(new MealRecipe());
    }
}

export const mealRecipeRoute: Routes = [
    {
        path: '',
        component: MealRecipeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRecipes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealRecipeDetailComponent,
        resolve: {
            mealRecipe: MealRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRecipes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealRecipeUpdateComponent,
        resolve: {
            mealRecipe: MealRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRecipes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealRecipeUpdateComponent,
        resolve: {
            mealRecipe: MealRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRecipes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealRecipePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealRecipeDeletePopupComponent,
        resolve: {
            mealRecipe: MealRecipeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRecipes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
