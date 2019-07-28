import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { LandingPageCardPage } from './landing-page-card';
import { LandingPageCardUpdatePage } from './landing-page-card-update';
import { LandingPageCard, LandingPageCardService, LandingPageCardDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class LandingPageCardResolve implements Resolve<LandingPageCard> {
  constructor(private service: LandingPageCardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LandingPageCard> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LandingPageCard>) => response.ok),
        map((landingPageCard: HttpResponse<LandingPageCard>) => landingPageCard.body)
      );
    }
    return of(new LandingPageCard());
  }
}

const routes: Routes = [
    {
      path: '',
      component: LandingPageCardPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: LandingPageCardUpdatePage,
      resolve: {
        data: LandingPageCardResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: LandingPageCardDetailPage,
      resolve: {
        data: LandingPageCardResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: LandingPageCardUpdatePage,
      resolve: {
        data: LandingPageCardResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        LandingPageCardPage,
        LandingPageCardUpdatePage,
        LandingPageCardDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ],
    providers: [Camera]
})
export class LandingPageCardPageModule {
}
