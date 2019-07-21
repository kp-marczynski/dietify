import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HouseholdMeasure } from 'app/shared/model/products/household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';
import { HouseholdMeasureComponent } from './household-measure.component';
import { HouseholdMeasureDetailComponent } from './household-measure-detail.component';
import { HouseholdMeasureUpdateComponent } from './household-measure-update.component';
import { HouseholdMeasureDeletePopupComponent } from './household-measure-delete-dialog.component';
import { IHouseholdMeasure } from 'app/shared/model/products/household-measure.model';

@Injectable({ providedIn: 'root' })
export class HouseholdMeasureResolve implements Resolve<IHouseholdMeasure> {
  constructor(private service: HouseholdMeasureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHouseholdMeasure> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HouseholdMeasure>) => response.ok),
        map((householdMeasure: HttpResponse<HouseholdMeasure>) => householdMeasure.body)
      );
    }
    return of(new HouseholdMeasure());
  }
}

export const householdMeasureRoute: Routes = [
  {
    path: '',
    component: HouseholdMeasureComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsHouseholdMeasure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HouseholdMeasureDetailComponent,
    resolve: {
      householdMeasure: HouseholdMeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsHouseholdMeasure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HouseholdMeasureUpdateComponent,
    resolve: {
      householdMeasure: HouseholdMeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsHouseholdMeasure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HouseholdMeasureUpdateComponent,
    resolve: {
      householdMeasure: HouseholdMeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsHouseholdMeasure.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const householdMeasurePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HouseholdMeasureDeletePopupComponent,
    resolve: {
      householdMeasure: HouseholdMeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.productsHouseholdMeasure.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
