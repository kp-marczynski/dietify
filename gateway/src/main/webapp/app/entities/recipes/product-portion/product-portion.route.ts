import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductPortion } from 'app/shared/model/recipes/product-portion.model';
import { ProductPortionService } from './product-portion.service';
import { ProductPortionComponent } from './product-portion.component';
import { ProductPortionDetailComponent } from './product-portion-detail.component';
import { ProductPortionUpdateComponent } from './product-portion-update.component';
import { ProductPortionDeletePopupComponent } from './product-portion-delete-dialog.component';
import { IProductPortion } from 'app/shared/model/recipes/product-portion.model';

@Injectable({ providedIn: 'root' })
export class ProductPortionResolve implements Resolve<IProductPortion> {
  constructor(private service: ProductPortionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductPortion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductPortion>) => response.ok),
        map((productPortion: HttpResponse<ProductPortion>) => productPortion.body)
      );
    }
    return of(new ProductPortion());
  }
}

export const productPortionRoute: Routes = [
  {
    path: '',
    component: ProductPortionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesProductPortion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductPortionDetailComponent,
    resolve: {
      productPortion: ProductPortionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesProductPortion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductPortionUpdateComponent,
    resolve: {
      productPortion: ProductPortionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesProductPortion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductPortionUpdateComponent,
    resolve: {
      productPortion: ProductPortionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesProductPortion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productPortionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductPortionDeletePopupComponent,
    resolve: {
      productPortion: ProductPortionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesProductPortion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
