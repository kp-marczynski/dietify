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

import { RecipeUnsuitableForDietPage } from './recipe-unsuitable-for-diet';
import { RecipeUnsuitableForDietUpdatePage } from './recipe-unsuitable-for-diet-update';
import { RecipeUnsuitableForDiet, RecipeUnsuitableForDietService, RecipeUnsuitableForDietDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RecipeUnsuitableForDietResolve implements Resolve<RecipeUnsuitableForDiet> {
  constructor(private service: RecipeUnsuitableForDietService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeUnsuitableForDiet> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeUnsuitableForDiet>) => response.ok),
        map((recipeUnsuitableForDiet: HttpResponse<RecipeUnsuitableForDiet>) => recipeUnsuitableForDiet.body)
      );
    }
    return of(new RecipeUnsuitableForDiet());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RecipeUnsuitableForDietPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RecipeUnsuitableForDietUpdatePage,
      resolve: {
        data: RecipeUnsuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RecipeUnsuitableForDietDetailPage,
      resolve: {
        data: RecipeUnsuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RecipeUnsuitableForDietUpdatePage,
      resolve: {
        data: RecipeUnsuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RecipeUnsuitableForDietPage,
        RecipeUnsuitableForDietUpdatePage,
        RecipeUnsuitableForDietDetailPage
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
export class RecipeUnsuitableForDietPageModule {
}
