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

import { NutritionDefinitionTranslationPage } from './nutrition-definition-translation';
import { NutritionDefinitionTranslationUpdatePage } from './nutrition-definition-translation-update';
import { NutritionDefinitionTranslation, NutritionDefinitionTranslationService, NutritionDefinitionTranslationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class NutritionDefinitionTranslationResolve implements Resolve<NutritionDefinitionTranslation> {
  constructor(private service: NutritionDefinitionTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NutritionDefinitionTranslation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionDefinitionTranslation>) => response.ok),
        map((nutritionDefinitionTranslation: HttpResponse<NutritionDefinitionTranslation>) => nutritionDefinitionTranslation.body)
      );
    }
    return of(new NutritionDefinitionTranslation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: NutritionDefinitionTranslationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: NutritionDefinitionTranslationUpdatePage,
      resolve: {
        data: NutritionDefinitionTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: NutritionDefinitionTranslationDetailPage,
      resolve: {
        data: NutritionDefinitionTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: NutritionDefinitionTranslationUpdatePage,
      resolve: {
        data: NutritionDefinitionTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        NutritionDefinitionTranslationPage,
        NutritionDefinitionTranslationUpdatePage,
        NutritionDefinitionTranslationDetailPage
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
export class NutritionDefinitionTranslationPageModule {
}
