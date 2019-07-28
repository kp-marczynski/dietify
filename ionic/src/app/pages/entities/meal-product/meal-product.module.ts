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

import { MealProductPage } from './meal-product';
import { MealProductUpdatePage } from './meal-product-update';
import { MealProduct, MealProductService, MealProductDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealProductResolve implements Resolve<MealProduct> {
  constructor(private service: MealProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealProduct> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealProduct>) => response.ok),
        map((mealProduct: HttpResponse<MealProduct>) => mealProduct.body)
      );
    }
    return of(new MealProduct());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealProductPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealProductUpdatePage,
      resolve: {
        data: MealProductResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealProductDetailPage,
      resolve: {
        data: MealProductResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealProductUpdatePage,
      resolve: {
        data: MealProductResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealProductPage,
        MealProductUpdatePage,
        MealProductDetailPage
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
export class MealProductPageModule {
}
