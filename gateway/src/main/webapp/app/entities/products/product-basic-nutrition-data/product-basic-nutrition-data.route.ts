import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';
import { ProductBasicNutritionDataComponent } from './product-basic-nutrition-data.component';
import { ProductBasicNutritionDataDetailComponent } from './product-basic-nutrition-data-detail.component';
import { ProductBasicNutritionDataUpdateComponent } from './product-basic-nutrition-data-update.component';
import { ProductBasicNutritionDataDeletePopupComponent } from './product-basic-nutrition-data-delete-dialog.component';
import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';

@Injectable({ providedIn: 'root' })
export class ProductBasicNutritionDataResolve implements Resolve<IProductBasicNutritionData> {
  constructor(private service: ProductBasicNutritionDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductBasicNutritionData> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductBasicNutritionData>) => response.ok),
        map((productBasicNutritionData: HttpResponse<ProductBasicNutritionData>) => productBasicNutritionData.body)
      );
    }
    return of(new ProductBasicNutritionData());
  }
}

export const productBasicNutritionDataRoute: Routes = [
  {
    path: '',
    component: ProductBasicNutritionDataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductBasicNutritionDataDetailComponent,
    resolve: {
      productBasicNutritionData: ProductBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductBasicNutritionDataUpdateComponent,
    resolve: {
      productBasicNutritionData: ProductBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductBasicNutritionDataUpdateComponent,
    resolve: {
      productBasicNutritionData: ProductBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productBasicNutritionDataPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductBasicNutritionDataDeletePopupComponent,
    resolve: {
      productBasicNutritionData: ProductBasicNutritionDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductBasicNutritionData.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
