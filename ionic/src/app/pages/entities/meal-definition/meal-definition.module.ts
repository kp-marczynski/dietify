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

import { MealDefinitionPage } from './meal-definition';
import { MealDefinitionUpdatePage } from './meal-definition-update';
import { MealDefinition, MealDefinitionService, MealDefinitionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MealDefinitionResolve implements Resolve<MealDefinition> {
  constructor(private service: MealDefinitionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealDefinition> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealDefinition>) => response.ok),
        map((mealDefinition: HttpResponse<MealDefinition>) => mealDefinition.body)
      );
    }
    return of(new MealDefinition());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MealDefinitionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MealDefinitionUpdatePage,
      resolve: {
        data: MealDefinitionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MealDefinitionDetailPage,
      resolve: {
        data: MealDefinitionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MealDefinitionUpdatePage,
      resolve: {
        data: MealDefinitionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MealDefinitionPage,
        MealDefinitionUpdatePage,
        MealDefinitionDetailPage
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
export class MealDefinitionPageModule {
}
