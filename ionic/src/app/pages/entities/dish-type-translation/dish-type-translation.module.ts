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

import { DishTypeTranslationPage } from './dish-type-translation';
import { DishTypeTranslationUpdatePage } from './dish-type-translation-update';
import { DishTypeTranslation, DishTypeTranslationService, DishTypeTranslationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class DishTypeTranslationResolve implements Resolve<DishTypeTranslation> {
  constructor(private service: DishTypeTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DishTypeTranslation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DishTypeTranslation>) => response.ok),
        map((dishTypeTranslation: HttpResponse<DishTypeTranslation>) => dishTypeTranslation.body)
      );
    }
    return of(new DishTypeTranslation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: DishTypeTranslationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: DishTypeTranslationUpdatePage,
      resolve: {
        data: DishTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: DishTypeTranslationDetailPage,
      resolve: {
        data: DishTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: DishTypeTranslationUpdatePage,
      resolve: {
        data: DishTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        DishTypeTranslationPage,
        DishTypeTranslationUpdatePage,
        DishTypeTranslationDetailPage
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
export class DishTypeTranslationPageModule {
}
