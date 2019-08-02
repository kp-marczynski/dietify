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

import { HouseholdMeasurePage } from './household-measure';
import { HouseholdMeasureUpdatePage } from './household-measure-update';
import { HouseholdMeasure, HouseholdMeasureService, HouseholdMeasureDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class HouseholdMeasureResolve implements Resolve<HouseholdMeasure> {
  constructor(private service: HouseholdMeasureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HouseholdMeasure> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HouseholdMeasure>) => response.ok),
        map((householdMeasure: HttpResponse<HouseholdMeasure>) => householdMeasure.body)
      );
    }
    return of(new HouseholdMeasure());
  }
}

const routes: Routes = [
    {
      path: '',
      component: HouseholdMeasurePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: HouseholdMeasureUpdatePage,
      resolve: {
        data: HouseholdMeasureResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: HouseholdMeasureDetailPage,
      resolve: {
        data: HouseholdMeasureResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: HouseholdMeasureUpdatePage,
      resolve: {
        data: HouseholdMeasureResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        HouseholdMeasurePage,
        HouseholdMeasureUpdatePage,
        HouseholdMeasureDetailPage
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
export class HouseholdMeasurePageModule {
}
