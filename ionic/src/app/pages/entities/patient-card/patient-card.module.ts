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

import { PatientCardPage } from './patient-card';
import { PatientCardUpdatePage } from './patient-card-update';
import { PatientCard, PatientCardService, PatientCardDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class PatientCardResolve implements Resolve<PatientCard> {
  constructor(private service: PatientCardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PatientCard> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PatientCard>) => response.ok),
        map((patientCard: HttpResponse<PatientCard>) => patientCard.body)
      );
    }
    return of(new PatientCard());
  }
}

const routes: Routes = [
    {
      path: '',
      component: PatientCardPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: PatientCardUpdatePage,
      resolve: {
        data: PatientCardResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: PatientCardDetailPage,
      resolve: {
        data: PatientCardResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: PatientCardUpdatePage,
      resolve: {
        data: PatientCardResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        PatientCardPage,
        PatientCardUpdatePage,
        PatientCardDetailPage
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
export class PatientCardPageModule {
}
