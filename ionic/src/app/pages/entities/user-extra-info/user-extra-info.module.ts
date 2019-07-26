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

import { UserExtraInfoPage } from './user-extra-info';
import { UserExtraInfoUpdatePage } from './user-extra-info-update';
import { UserExtraInfo, UserExtraInfoService, UserExtraInfoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class UserExtraInfoResolve implements Resolve<UserExtraInfo> {
  constructor(private service: UserExtraInfoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserExtraInfo> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserExtraInfo>) => response.ok),
        map((userExtraInfo: HttpResponse<UserExtraInfo>) => userExtraInfo.body)
      );
    }
    return of(new UserExtraInfo());
  }
}

const routes: Routes = [
    {
      path: '',
      component: UserExtraInfoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: UserExtraInfoUpdatePage,
      resolve: {
        data: UserExtraInfoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: UserExtraInfoDetailPage,
      resolve: {
        data: UserExtraInfoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: UserExtraInfoUpdatePage,
      resolve: {
        data: UserExtraInfoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        UserExtraInfoPage,
        UserExtraInfoUpdatePage,
        UserExtraInfoDetailPage
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
export class UserExtraInfoPageModule {
}
