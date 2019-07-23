import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NutritionData } from 'app/shared/model/products/nutrition-data.model';
import { NutritionDataService } from './nutrition-data.service';
import { NutritionDataComponent } from './nutrition-data.component';
import { NutritionDataDetailComponent } from './nutrition-data-detail.component';
import { NutritionDataUpdateComponent } from './nutrition-data-update.component';
import { NutritionDataDeletePopupComponent } from './nutrition-data-delete-dialog.component';
import { INutritionData } from 'app/shared/model/products/nutrition-data.model';

@Injectable({ providedIn: 'root' })
export class NutritionDataResolve implements Resolve<INutritionData> {
  constructor(private service: NutritionDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INutritionData> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionData>) => response.ok),
        map((nutritionData: HttpResponse<NutritionData>) => nutritionData.body)
      );
    }
    return of(new NutritionData());
  }
}

export const nutritionDataRoute: Routes = [
  {
    path: '',
    component: NutritionDataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NutritionDataDetailComponent,
    resolve: {
      nutritionData: NutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NutritionDataUpdateComponent,
    resolve: {
      nutritionData: NutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NutritionDataUpdateComponent,
    resolve: {
      nutritionData: NutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nutritionDataPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NutritionDataDeletePopupComponent,
    resolve: {
      nutritionData: NutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
