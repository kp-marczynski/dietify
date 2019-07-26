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

import { DietTypeTranslationPage } from './diet-type-translation';
import { DietTypeTranslationUpdatePage } from './diet-type-translation-update';
import { DietTypeTranslation, DietTypeTranslationService, DietTypeTranslationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class DietTypeTranslationResolve implements Resolve<DietTypeTranslation> {
  constructor(private service: DietTypeTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DietTypeTranslation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DietTypeTranslation>) => response.ok),
        map((dietTypeTranslation: HttpResponse<DietTypeTranslation>) => dietTypeTranslation.body)
      );
    }
    return of(new DietTypeTranslation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: DietTypeTranslationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: DietTypeTranslationUpdatePage,
      resolve: {
        data: DietTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: DietTypeTranslationDetailPage,
      resolve: {
        data: DietTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: DietTypeTranslationUpdatePage,
      resolve: {
        data: DietTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        DietTypeTranslationPage,
        DietTypeTranslationUpdatePage,
        DietTypeTranslationDetailPage
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
export class DietTypeTranslationPageModule {
}
