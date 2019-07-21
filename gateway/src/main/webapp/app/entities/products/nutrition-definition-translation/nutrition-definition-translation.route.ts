import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';
import { NutritionDefinitionTranslationComponent } from './nutrition-definition-translation.component';
import { NutritionDefinitionTranslationDetailComponent } from './nutrition-definition-translation-detail.component';
import { NutritionDefinitionTranslationUpdateComponent } from './nutrition-definition-translation-update.component';
import { NutritionDefinitionTranslationDeletePopupComponent } from './nutrition-definition-translation-delete-dialog.component';
import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';

@Injectable({ providedIn: 'root' })
export class NutritionDefinitionTranslationResolve implements Resolve<INutritionDefinitionTranslation> {
  constructor(private service: NutritionDefinitionTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INutritionDefinitionTranslation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionDefinitionTranslation>) => response.ok),
        map((nutritionDefinitionTranslation: HttpResponse<NutritionDefinitionTranslation>) => nutritionDefinitionTranslation.body)
      );
    }
    return of(new NutritionDefinitionTranslation());
  }
}

export const nutritionDefinitionTranslationRoute: Routes = [
  {
    path: '',
    component: NutritionDefinitionTranslationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinitionTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NutritionDefinitionTranslationDetailComponent,
    resolve: {
      nutritionDefinitionTranslation: NutritionDefinitionTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinitionTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NutritionDefinitionTranslationUpdateComponent,
    resolve: {
      nutritionDefinitionTranslation: NutritionDefinitionTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinitionTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NutritionDefinitionTranslationUpdateComponent,
    resolve: {
      nutritionDefinitionTranslation: NutritionDefinitionTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinitionTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nutritionDefinitionTranslationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NutritionDefinitionTranslationDeletePopupComponent,
    resolve: {
      nutritionDefinitionTranslation: NutritionDefinitionTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinitionTranslation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
