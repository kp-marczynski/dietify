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

import { NutritionDefinitionPage } from './nutrition-definition';
import { NutritionDefinitionUpdatePage } from './nutrition-definition-update';
import { NutritionDefinition, NutritionDefinitionService, NutritionDefinitionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class NutritionDefinitionResolve implements Resolve<NutritionDefinition> {
  constructor(private service: NutritionDefinitionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NutritionDefinition> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NutritionDefinition>) => response.ok),
        map((nutritionDefinition: HttpResponse<NutritionDefinition>) => nutritionDefinition.body)
      );
    }
    return of(new NutritionDefinition());
  }
}

const routes: Routes = [
    {
      path: '',
      component: NutritionDefinitionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: NutritionDefinitionUpdatePage,
      resolve: {
        data: NutritionDefinitionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: NutritionDefinitionDetailPage,
      resolve: {
        data: NutritionDefinitionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: NutritionDefinitionUpdatePage,
      resolve: {
        data: NutritionDefinitionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        NutritionDefinitionPage,
        NutritionDefinitionUpdatePage,
        NutritionDefinitionDetailPage
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
export class NutritionDefinitionPageModule {
}
