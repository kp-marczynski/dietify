import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';
import { KitchenApplianceComponent } from './kitchen-appliance.component';
import { KitchenApplianceDetailComponent } from './kitchen-appliance-detail.component';
import { KitchenApplianceUpdateComponent } from './kitchen-appliance-update.component';
import { KitchenApplianceDeletePopupComponent } from './kitchen-appliance-delete-dialog.component';
import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';

@Injectable({ providedIn: 'root' })
export class KitchenApplianceResolve implements Resolve<IKitchenAppliance> {
  constructor(private service: KitchenApplianceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKitchenAppliance> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<KitchenAppliance>) => response.ok),
        map((kitchenAppliance: HttpResponse<KitchenAppliance>) => kitchenAppliance.body)
      );
    }
    return of(new KitchenAppliance());
  }
}

export const kitchenApplianceRoute: Routes = [
  {
    path: '',
    component: KitchenApplianceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KitchenApplianceDetailComponent,
    resolve: {
      kitchenAppliance: KitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KitchenApplianceUpdateComponent,
    resolve: {
      kitchenAppliance: KitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KitchenApplianceUpdateComponent,
    resolve: {
      kitchenAppliance: KitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const kitchenAppliancePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KitchenApplianceDeletePopupComponent,
    resolve: {
      kitchenAppliance: KitchenApplianceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenAppliance.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
