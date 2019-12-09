import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';
import { KitchenApplianceTranslationComponent } from './kitchen-appliance-translation.component';
import { KitchenApplianceTranslationDetailComponent } from './kitchen-appliance-translation-detail.component';
import { KitchenApplianceTranslationUpdateComponent } from './kitchen-appliance-translation-update.component';
import { KitchenApplianceTranslationDeletePopupComponent } from './kitchen-appliance-translation-delete-dialog.component';
import { IKitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

@Injectable({ providedIn: 'root' })
export class KitchenApplianceTranslationResolve implements Resolve<IKitchenApplianceTranslation> {
  constructor(private service: KitchenApplianceTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKitchenApplianceTranslation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<KitchenApplianceTranslation>) => response.ok),
        map((kitchenApplianceTranslation: HttpResponse<KitchenApplianceTranslation>) => kitchenApplianceTranslation.body)
      );
    }
    return of(new KitchenApplianceTranslation());
  }
}

export const kitchenApplianceTranslationRoute: Routes = [
  {
    path: '',
    component: KitchenApplianceTranslationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenApplianceTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KitchenApplianceTranslationDetailComponent,
    resolve: {
      kitchenApplianceTranslation: KitchenApplianceTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenApplianceTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KitchenApplianceTranslationUpdateComponent,
    resolve: {
      kitchenApplianceTranslation: KitchenApplianceTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenApplianceTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KitchenApplianceTranslationUpdateComponent,
    resolve: {
      kitchenApplianceTranslation: KitchenApplianceTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenApplianceTranslation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const kitchenApplianceTranslationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KitchenApplianceTranslationDeletePopupComponent,
    resolve: {
      kitchenApplianceTranslation: KitchenApplianceTranslationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.recipesKitchenApplianceTranslation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
