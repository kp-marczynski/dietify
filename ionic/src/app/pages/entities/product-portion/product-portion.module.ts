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

import { ProductPortionPage } from './product-portion';
import { ProductPortionUpdatePage } from './product-portion-update';
import { ProductPortion, ProductPortionService, ProductPortionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ProductPortionResolve implements Resolve<ProductPortion> {
  constructor(private service: ProductPortionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductPortion> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductPortion>) => response.ok),
        map((productPortion: HttpResponse<ProductPortion>) => productPortion.body)
      );
    }
    return of(new ProductPortion());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ProductPortionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ProductPortionUpdatePage,
      resolve: {
        data: ProductPortionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ProductPortionDetailPage,
      resolve: {
        data: ProductPortionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ProductPortionUpdatePage,
      resolve: {
        data: ProductPortionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ProductPortionPage,
        ProductPortionUpdatePage,
        ProductPortionDetailPage
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
export class ProductPortionPageModule {
}
