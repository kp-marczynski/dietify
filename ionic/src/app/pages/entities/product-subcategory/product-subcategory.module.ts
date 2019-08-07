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

import { ProductSubcategoryPage } from './product-subcategory';
import { ProductSubcategoryUpdatePage } from './product-subcategory-update';
import { ProductSubcategory, ProductSubcategoryService, ProductSubcategoryDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ProductSubcategoryResolve implements Resolve<ProductSubcategory> {
  constructor(private service: ProductSubcategoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductSubcategory> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductSubcategory>) => response.ok),
        map((productSubcategory: HttpResponse<ProductSubcategory>) => productSubcategory.body)
      );
    }
    return of(new ProductSubcategory());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ProductSubcategoryPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ProductSubcategoryUpdatePage,
      resolve: {
        data: ProductSubcategoryResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ProductSubcategoryDetailPage,
      resolve: {
        data: ProductSubcategoryResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ProductSubcategoryUpdatePage,
      resolve: {
        data: ProductSubcategoryResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ProductSubcategoryPage,
        ProductSubcategoryUpdatePage,
        ProductSubcategoryDetailPage
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
export class ProductSubcategoryPageModule {
}
