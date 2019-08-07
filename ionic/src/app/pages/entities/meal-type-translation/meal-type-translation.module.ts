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

import { MealTypeTranslationPage } from './meal-type-translation';
import { MealTypeTranslationUpdatePage } from './meal-type-translation-update';
import { MealTypeTranslation, MealTypeTranslationService, MealTypeTranslationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealTypeTranslationResolve implements Resolve<MealTypeTranslation> {
  constructor(private service: MealTypeTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealTypeTranslation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealTypeTranslation>) => response.ok),
        map((mealTypeTranslation: HttpResponse<MealTypeTranslation>) => mealTypeTranslation.body)
      );
    }
    return of(new MealTypeTranslation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealTypeTranslationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealTypeTranslationUpdatePage,
      resolve: {
        data: MealTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealTypeTranslationDetailPage,
      resolve: {
        data: MealTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealTypeTranslationUpdatePage,
      resolve: {
        data: MealTypeTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealTypeTranslationPage,
        MealTypeTranslationUpdatePage,
        MealTypeTranslationDetailPage
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
export class MealTypeTranslationPageModule {
}
