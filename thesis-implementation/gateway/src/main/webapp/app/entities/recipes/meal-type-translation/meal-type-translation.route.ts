import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';
import { MealTypeTranslationService } from './meal-type-translation.service';
import { MealTypeTranslationComponent } from './meal-type-translation.component';
import { MealTypeTranslationDetailComponent } from './meal-type-translation-detail.component';
import { MealTypeTranslationUpdateComponent } from './meal-type-translation-update.component';
import { MealTypeTranslationDeletePopupComponent } from './meal-type-translation-delete-dialog.component';
import { IMealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

@Injectable({ providedIn: 'root' })
export class MealTypeTranslationResolve implements Resolve<IMealTypeTranslation> {
  constructor(private service: MealTypeTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealTypeTranslation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealTypeTranslation>) => response.ok),
        map((mealTypeTranslation: HttpResponse<MealTypeTranslation>) => mealTypeTranslation.body)
      );
    }
    return of(new MealTypeTranslation());
  }
}

export const mealTypeTranslationRoute: Routes = [
  {
    path: '',
    component: MealTypeTranslationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesMealTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MealTypeTranslationDetailComponent,
    resolve: {
      mealTypeTranslation: MealTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesMealTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MealTypeTranslationUpdateComponent,
    resolve: {
      mealTypeTranslation: MealTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesMealTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MealTypeTranslationUpdateComponent,
    resolve: {
      mealTypeTranslation: MealTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesMealTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mealTypeTranslationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MealTypeTranslationDeletePopupComponent,
    resolve: {
      mealTypeTranslation: MealTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesMealTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
