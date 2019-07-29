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

import { KitchenAppliancePage } from './kitchen-appliance';
import { KitchenApplianceUpdatePage } from './kitchen-appliance-update';
import { KitchenAppliance, KitchenApplianceService, KitchenApplianceDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class KitchenApplianceResolve implements Resolve<KitchenAppliance> {
  constructor(private service: KitchenApplianceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KitchenAppliance> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<KitchenAppliance>) => response.ok),
        map((kitchenAppliance: HttpResponse<KitchenAppliance>) => kitchenAppliance.body)
      );
    }
    return of(new KitchenAppliance());
  }
}

const routes: Routes = [
    {
      path: '',
      component: KitchenAppliancePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: KitchenApplianceUpdatePage,
      resolve: {
        data: KitchenApplianceResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: KitchenApplianceDetailPage,
      resolve: {
        data: KitchenApplianceResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: KitchenApplianceUpdatePage,
      resolve: {
        data: KitchenApplianceResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        KitchenAppliancePage,
        KitchenApplianceUpdatePage,
        KitchenApplianceDetailPage
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
export class KitchenAppliancePageModule {
}
