import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';
import { DietTypeTranslationService } from './diet-type-translation.service';
import { DietTypeTranslationComponent } from './diet-type-translation.component';
import { DietTypeTranslationDetailComponent } from './diet-type-translation-detail.component';
import { DietTypeTranslationUpdateComponent } from './diet-type-translation-update.component';
import { DietTypeTranslationDeletePopupComponent } from './diet-type-translation-delete-dialog.component';
import { IDietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

@Injectable({ providedIn: 'root' })
export class DietTypeTranslationResolve implements Resolve<IDietTypeTranslation> {
  constructor(private service: DietTypeTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDietTypeTranslation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DietTypeTranslation>) => response.ok),
        map((dietTypeTranslation: HttpResponse<DietTypeTranslation>) => dietTypeTranslation.body)
      );
    }
    return of(new DietTypeTranslation());
  }
}

export const dietTypeTranslationRoute: Routes = [
  {
    path: '',
    component: DietTypeTranslationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsDietTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DietTypeTranslationDetailComponent,
    resolve: {
      dietTypeTranslation: DietTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsDietTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DietTypeTranslationUpdateComponent,
    resolve: {
      dietTypeTranslation: DietTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsDietTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DietTypeTranslationUpdateComponent,
    resolve: {
      dietTypeTranslation: DietTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsDietTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dietTypeTranslationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DietTypeTranslationDeletePopupComponent,
    resolve: {
      dietTypeTranslation: DietTypeTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsDietTypeTranslation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
