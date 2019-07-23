import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';
import { DishTypeTranslationService } from './dish-type-translation.service';
import { DishTypeTranslationComponent } from './dish-type-translation.component';
import { DishTypeTranslationDetailComponent } from './dish-type-translation-detail.component';
import { DishTypeTranslationUpdateComponent } from './dish-type-translation-update.component';
import { DishTypeTranslationDeletePopupComponent } from './dish-type-translation-delete-dialog.component';
import { IDishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';

@Injectable({ providedIn: 'root' })
export class DishTypeTranslationResolve implements Resolve<IDishTypeTranslation> {
  constructor(private service: DishTypeTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDishTypeTranslation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DishTypeTranslation>) => response.ok),
        map((dishTypeTranslation: HttpResponse<DishTypeTranslation>) => dishTypeTranslation.body)
      );
    }
    return of(new DishTypeTranslation());
  }
}

export const dishTypeTranslationRoute: Routes = [
  {
    path: '',
    component: DishTypeTranslationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesDishTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DishTypeTranslationDetailComponent,
    resolve: {
      dishTypeTranslation: DishTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesDishTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DishTypeTranslationUpdateComponent,
    resolve: {
      dishTypeTranslation: DishTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesDishTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DishTypeTranslationUpdateComponent,
    resolve: {
      dishTypeTranslation: DishTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesDishTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dishTypeTranslationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DishTypeTranslationDeletePopupComponent,
    resolve: {
      dishTypeTranslation: DishTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesDishTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
