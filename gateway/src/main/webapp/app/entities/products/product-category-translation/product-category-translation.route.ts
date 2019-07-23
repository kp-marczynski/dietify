import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';
import { ProductCategoryTranslationService } from './product-category-translation.service';
import { ProductCategoryTranslationComponent } from './product-category-translation.component';
import { ProductCategoryTranslationDetailComponent } from './product-category-translation-detail.component';
import { ProductCategoryTranslationUpdateComponent } from './product-category-translation-update.component';
import { ProductCategoryTranslationDeletePopupComponent } from './product-category-translation-delete-dialog.component';
import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

@Injectable({ providedIn: 'root' })
export class ProductCategoryTranslationResolve implements Resolve<IProductCategoryTranslation> {
  constructor(private service: ProductCategoryTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductCategoryTranslation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductCategoryTranslation>) => response.ok),
        map((productCategoryTranslation: HttpResponse<ProductCategoryTranslation>) => productCategoryTranslation.body)
      );
    }
    return of(new ProductCategoryTranslation());
  }
}

export const productCategoryTranslationRoute: Routes = [
  {
    path: '',
    component: ProductCategoryTranslationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductCategoryTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductCategoryTranslationDetailComponent,
    resolve: {
      productCategoryTranslation: ProductCategoryTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductCategoryTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductCategoryTranslationUpdateComponent,
    resolve: {
      productCategoryTranslation: ProductCategoryTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductCategoryTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductCategoryTranslationUpdateComponent,
    resolve: {
      productCategoryTranslation: ProductCategoryTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductCategoryTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productCategoryTranslationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductCategoryTranslationDeletePopupComponent,
    resolve: {
      productCategoryTranslation: ProductCategoryTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsProductCategoryTranslation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
