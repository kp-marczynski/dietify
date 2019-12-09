import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PatientCard } from 'app/shared/model/appointments/patient-card.model';
import { PatientCardService } from './patient-card.service';
import { PatientCardComponent } from './patient-card.component';
import { PatientCardDetailComponent } from './patient-card-detail.component';
import { PatientCardUpdateComponent } from './patient-card-update.component';
import { PatientCardDeletePopupComponent } from './patient-card-delete-dialog.component';
import { IPatientCard } from 'app/shared/model/appointments/patient-card.model';

@Injectable({ providedIn: 'root' })
export class PatientCardResolve implements Resolve<IPatientCard> {
  constructor(private service: PatientCardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPatientCard> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PatientCard>) => response.ok),
        map((patientCard: HttpResponse<PatientCard>) => patientCard.body)
      );
    }
    return of(new PatientCard());
  }
}

export const patientCardRoute: Routes = [
  {
    path: '',
    component: PatientCardComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.appointmentsPatientCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PatientCardDetailComponent,
    resolve: {
      patientCard: PatientCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsPatientCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PatientCardUpdateComponent,
    resolve: {
      patientCard: PatientCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsPatientCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PatientCardUpdateComponent,
    resolve: {
      patientCard: PatientCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsPatientCard.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const patientCardPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PatientCardDeletePopupComponent,
    resolve: {
      patientCard: PatientCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsPatientCard.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
