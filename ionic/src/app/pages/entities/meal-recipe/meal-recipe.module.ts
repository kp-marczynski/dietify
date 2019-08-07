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

import { MealRecipePage } from './meal-recipe';
import { MealRecipeUpdatePage } from './meal-recipe-update';
import { MealRecipe, MealRecipeService, MealRecipeDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealRecipeResolve implements Resolve<MealRecipe> {
  constructor(private service: MealRecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealRecipe> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealRecipe>) => response.ok),
        map((mealRecipe: HttpResponse<MealRecipe>) => mealRecipe.body)
      );
    }
    return of(new MealRecipe());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealRecipePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealRecipeUpdatePage,
      resolve: {
        data: MealRecipeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealRecipeDetailPage,
      resolve: {
        data: MealRecipeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealRecipeUpdatePage,
      resolve: {
        data: MealRecipeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealRecipePage,
        MealRecipeUpdatePage,
        MealRecipeDetailPage
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
export class MealRecipePageModule {
}
