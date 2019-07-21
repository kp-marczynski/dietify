import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';
import { OwnedKitchenApplianceComponent } from './owned-kitchen-appliance.component';
import { OwnedKitchenApplianceDetailComponent } from './owned-kitchen-appliance-detail.component';
import { OwnedKitchenApplianceUpdateComponent } from './owned-kitchen-appliance-update.component';
import { OwnedKitchenApplianceDeletePopupComponent } from './owned-kitchen-appliance-delete-dialog.component';
import { IOwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';

@Injectable({ providedIn: 'root' })
export class OwnedKitchenApplianceResolve implements Resolve<IOwnedKitchenAppliance> {
  constructor(private service: OwnedKitchenApplianceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOwnedKitchenAppliance> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OwnedKitchenAppliance>) => response.ok),
        map((ownedKitchenAppliance: HttpResponse<OwnedKitchenAppliance>) => ownedKitchenAppliance.body)
      );
    }
    return of(new OwnedKitchenAppliance());
  }
}

export const ownedKitchenApplianceRoute: Routes = [
  {
    path: '',
    component: OwnedKitchenApplianceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsOwnedKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OwnedKitchenApplianceDetailComponent,
    resolve: {
      ownedKitchenAppliance: OwnedKitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsOwnedKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OwnedKitchenApplianceUpdateComponent,
    resolve: {
      ownedKitchenAppliance: OwnedKitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsOwnedKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OwnedKitchenApplianceUpdateComponent,
    resolve: {
      ownedKitchenAppliance: OwnedKitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsOwnedKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ownedKitchenAppliancePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OwnedKitchenApplianceDeletePopupComponent,
    resolve: {
      ownedKitchenAppliance: OwnedKitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsOwnedKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
