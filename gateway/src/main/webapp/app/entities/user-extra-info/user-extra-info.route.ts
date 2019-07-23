import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserExtraInfo } from 'app/shared/model/user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';
import { UserExtraInfoComponent } from './user-extra-info.component';
import { UserExtraInfoDetailComponent } from './user-extra-info-detail.component';
import { UserExtraInfoUpdateComponent } from './user-extra-info-update.component';
import { UserExtraInfoDeletePopupComponent } from './user-extra-info-delete-dialog.component';
import { IUserExtraInfo } from 'app/shared/model/user-extra-info.model';

@Injectable({ providedIn: 'root' })
export class UserExtraInfoResolve implements Resolve<IUserExtraInfo> {
  constructor(private service: UserExtraInfoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserExtraInfo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserExtraInfo>) => response.ok),
        map((userExtraInfo: HttpResponse<UserExtraInfo>) => userExtraInfo.body)
      );
    }
    return of(new UserExtraInfo());
  }
}

export const userExtraInfoRoute: Routes = [
  {
    path: '',
    component: UserExtraInfoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.userExtraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserExtraInfoDetailComponent,
    resolve: {
      userExtraInfo: UserExtraInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.userExtraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserExtraInfoUpdateComponent,
    resolve: {
      userExtraInfo: UserExtraInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.userExtraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserExtraInfoUpdateComponent,
    resolve: {
      userExtraInfo: UserExtraInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.userExtraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userExtraInfoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserExtraInfoDeletePopupComponent,
    resolve: {
      userExtraInfo: UserExtraInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.userExtraInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
