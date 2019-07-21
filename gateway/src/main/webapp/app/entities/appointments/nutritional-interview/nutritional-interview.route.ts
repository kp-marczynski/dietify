import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { NutritionalInterviewService } from './nutritional-interview.service';
import { NutritionalInterviewComponent } from './nutritional-interview.component';
import { NutritionalInterviewDetailComponent } from './nutritional-interview-detail.component';
import { NutritionalInterviewUpdateComponent } from './nutritional-interview-update.component';
import { NutritionalInterviewDeletePopupComponent } from './nutritional-interview-delete-dialog.component';
import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

@Injectable({ providedIn: 'root' })
export class NutritionalInterviewResolve implements Resolve<INutritionalInterview> {
  constructor(private service: NutritionalInterviewService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INutritionalInterview> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionalInterview>) => response.ok),
        map((nutritionalInterview: HttpResponse<NutritionalInterview>) => nutritionalInterview.body)
      );
    }
    return of(new NutritionalInterview());
  }
}

export const nutritionalInterviewRoute: Routes = [
  {
    path: '',
    component: NutritionalInterviewComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsNutritionalInterview.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NutritionalInterviewDetailComponent,
    resolve: {
      nutritionalInterview: NutritionalInterviewResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsNutritionalInterview.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NutritionalInterviewUpdateComponent,
    resolve: {
      nutritionalInterview: NutritionalInterviewResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsNutritionalInterview.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NutritionalInterviewUpdateComponent,
    resolve: {
      nutritionalInterview: NutritionalInterviewResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsNutritionalInterview.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nutritionalInterviewPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NutritionalInterviewDeletePopupComponent,
    resolve: {
      nutritionalInterview: NutritionalInterviewResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsNutritionalInterview.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
