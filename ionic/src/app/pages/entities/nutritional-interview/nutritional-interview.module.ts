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

import { NutritionalInterviewPage } from './nutritional-interview';
import { NutritionalInterviewUpdatePage } from './nutritional-interview-update';
import { NutritionalInterview, NutritionalInterviewService, NutritionalInterviewDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class NutritionalInterviewResolve implements Resolve<NutritionalInterview> {
  constructor(private service: NutritionalInterviewService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NutritionalInterview> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionalInterview>) => response.ok),
        map((nutritionalInterview: HttpResponse<NutritionalInterview>) => nutritionalInterview.body)
      );
    }
    return of(new NutritionalInterview());
  }
}

const routes: Routes = [
    {
      path: '',
      component: NutritionalInterviewPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: NutritionalInterviewUpdatePage,
      resolve: {
        data: NutritionalInterviewResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: NutritionalInterviewDetailPage,
      resolve: {
        data: NutritionalInterviewResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: NutritionalInterviewUpdatePage,
      resolve: {
        data: NutritionalInterviewResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        NutritionalInterviewPage,
        NutritionalInterviewUpdatePage,
        NutritionalInterviewDetailPage
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
export class NutritionalInterviewPageModule {
}
