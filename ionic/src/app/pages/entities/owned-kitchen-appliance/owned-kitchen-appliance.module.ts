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

import { OwnedKitchenAppliancePage } from './owned-kitchen-appliance';
import { OwnedKitchenApplianceUpdatePage } from './owned-kitchen-appliance-update';
import { OwnedKitchenAppliance, OwnedKitchenApplianceService, OwnedKitchenApplianceDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class OwnedKitchenApplianceResolve implements Resolve<OwnedKitchenAppliance> {
  constructor(private service: OwnedKitchenApplianceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OwnedKitchenAppliance> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OwnedKitchenAppliance>) => response.ok),
        map((ownedKitchenAppliance: HttpResponse<OwnedKitchenAppliance>) => ownedKitchenAppliance.body)
      );
    }
    return of(new OwnedKitchenAppliance());
  }
}

const routes: Routes = [
    {
      path: '',
      component: OwnedKitchenAppliancePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: OwnedKitchenApplianceUpdatePage,
      resolve: {
        data: OwnedKitchenApplianceResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: OwnedKitchenApplianceDetailPage,
      resolve: {
        data: OwnedKitchenApplianceResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: OwnedKitchenApplianceUpdatePage,
      resolve: {
        data: OwnedKitchenApplianceResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        OwnedKitchenAppliancePage,
        OwnedKitchenApplianceUpdatePage,
        OwnedKitchenApplianceDetailPage
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
export class OwnedKitchenAppliancePageModule {
}
