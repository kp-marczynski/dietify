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

import { PreparationStepPage } from './preparation-step';
import { PreparationStepUpdatePage } from './preparation-step-update';
import { PreparationStep, PreparationStepService, PreparationStepDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class PreparationStepResolve implements Resolve<PreparationStep> {
  constructor(private service: PreparationStepService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PreparationStep> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PreparationStep>) => response.ok),
        map((preparationStep: HttpResponse<PreparationStep>) => preparationStep.body)
      );
    }
    return of(new PreparationStep());
  }
}

const routes: Routes = [
    {
      path: '',
      component: PreparationStepPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: PreparationStepUpdatePage,
      resolve: {
        data: PreparationStepResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: PreparationStepDetailPage,
      resolve: {
        data: PreparationStepResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: PreparationStepUpdatePage,
      resolve: {
        data: PreparationStepResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        PreparationStepPage,
        PreparationStepUpdatePage,
        PreparationStepDetailPage
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
export class PreparationStepPageModule {
}
