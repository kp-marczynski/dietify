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

import { ProductBasicNutritionDataPage } from './product-basic-nutrition-data';
import { ProductBasicNutritionDataUpdatePage } from './product-basic-nutrition-data-update';
import { ProductBasicNutritionData, ProductBasicNutritionDataService, ProductBasicNutritionDataDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ProductBasicNutritionDataResolve implements Resolve<ProductBasicNutritionData> {
  constructor(private service: ProductBasicNutritionDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductBasicNutritionData> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductBasicNutritionData>) => response.ok),
        map((productBasicNutritionData: HttpResponse<ProductBasicNutritionData>) => productBasicNutritionData.body)
      );
    }
    return of(new ProductBasicNutritionData());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ProductBasicNutritionDataPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ProductBasicNutritionDataUpdatePage,
      resolve: {
        data: ProductBasicNutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ProductBasicNutritionDataDetailPage,
      resolve: {
        data: ProductBasicNutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ProductBasicNutritionDataUpdatePage,
      resolve: {
        data: ProductBasicNutritionDataResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ProductBasicNutritionDataPage,
        ProductBasicNutritionDataUpdatePage,
        ProductBasicNutritionDataDetailPage
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
export class ProductBasicNutritionDataPageModule {
}
