import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LandingPageCard } from 'app/shared/model/landing-page-card.model';
import { LandingPageCardService } from './landing-page-card.service';
import { LandingPageCardComponent } from './landing-page-card.component';
import { LandingPageCardDetailComponent } from './landing-page-card-detail.component';
import { LandingPageCardUpdateComponent } from './landing-page-card-update.component';
import { LandingPageCardDeletePopupComponent } from './landing-page-card-delete-dialog.component';
import { ILandingPageCard } from 'app/shared/model/landing-page-card.model';

@Injectable({ providedIn: 'root' })
export class LandingPageCardResolve implements Resolve<ILandingPageCard> {
  constructor(private service: LandingPageCardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILandingPageCard> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LandingPageCard>) => response.ok),
        map((landingPageCard: HttpResponse<LandingPageCard>) => landingPageCard.body)
      );
    }
    return of(new LandingPageCard());
  }
}

export const landingPageCardRoute: Routes = [
  {
    path: '',
    component: LandingPageCardComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.landingPageCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LandingPageCardDetailComponent,
    resolve: {
      landingPageCard: LandingPageCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.landingPageCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LandingPageCardUpdateComponent,
    resolve: {
      landingPageCard: LandingPageCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.landingPageCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LandingPageCardUpdateComponent,
    resolve: {
      landingPageCard: LandingPageCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.landingPageCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const landingPageCardPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LandingPageCardDeletePopupComponent,
    resolve: {
      landingPageCard: LandingPageCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.landingPageCard.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
