import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';
import { NutritionDefinitionComponent } from './nutrition-definition.component';
import { NutritionDefinitionDetailComponent } from './nutrition-definition-detail.component';
import { NutritionDefinitionUpdateComponent } from './nutrition-definition-update.component';
import { NutritionDefinitionDeletePopupComponent } from './nutrition-definition-delete-dialog.component';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';

@Injectable({ providedIn: 'root' })
export class NutritionDefinitionResolve implements Resolve<INutritionDefinition> {
  constructor(private service: NutritionDefinitionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INutritionDefinition> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionDefinition>) => response.ok),
        map((nutritionDefinition: HttpResponse<NutritionDefinition>) => nutritionDefinition.body)
      );
    }
    return of(new NutritionDefinition());
  }
}

export const nutritionDefinitionRoute: Routes = [
  {
    path: '',
    component: NutritionDefinitionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NutritionDefinitionDetailComponent,
    resolve: {
      nutritionDefinition: NutritionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NutritionDefinitionUpdateComponent,
    resolve: {
      nutritionDefinition: NutritionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NutritionDefinitionUpdateComponent,
    resolve: {
      nutritionDefinition: NutritionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nutritionDefinitionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NutritionDefinitionDeletePopupComponent,
    resolve: {
      nutritionDefinition: NutritionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
