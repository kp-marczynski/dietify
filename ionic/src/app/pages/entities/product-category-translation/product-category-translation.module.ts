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

import { ProductCategoryTranslationPage } from './product-category-translation';
import { ProductCategoryTranslationUpdatePage } from './product-category-translation-update';
import { ProductCategoryTranslation, ProductCategoryTranslationService, ProductCategoryTranslationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ProductCategoryTranslationResolve implements Resolve<ProductCategoryTranslation> {
  constructor(private service: ProductCategoryTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductCategoryTranslation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductCategoryTranslation>) => response.ok),
        map((productCategoryTranslation: HttpResponse<ProductCategoryTranslation>) => productCategoryTranslation.body)
      );
    }
    return of(new ProductCategoryTranslation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ProductCategoryTranslationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ProductCategoryTranslationUpdatePage,
      resolve: {
        data: ProductCategoryTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ProductCategoryTranslationDetailPage,
      resolve: {
        data: ProductCategoryTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ProductCategoryTranslationUpdatePage,
      resolve: {
        data: ProductCategoryTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ProductCategoryTranslationPage,
        ProductCategoryTranslationUpdatePage,
        ProductCategoryTranslationDetailPage
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
export class ProductCategoryTranslationPageModule {
}
