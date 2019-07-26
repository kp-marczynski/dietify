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

import { RecipeSuitableForDietPage } from './recipe-suitable-for-diet';
import { RecipeSuitableForDietUpdatePage } from './recipe-suitable-for-diet-update';
import { RecipeSuitableForDiet, RecipeSuitableForDietService, RecipeSuitableForDietDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RecipeSuitableForDietResolve implements Resolve<RecipeSuitableForDiet> {
  constructor(private service: RecipeSuitableForDietService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeSuitableForDiet> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeSuitableForDiet>) => response.ok),
        map((recipeSuitableForDiet: HttpResponse<RecipeSuitableForDiet>) => recipeSuitableForDiet.body)
      );
    }
    return of(new RecipeSuitableForDiet());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RecipeSuitableForDietPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RecipeSuitableForDietUpdatePage,
      resolve: {
        data: RecipeSuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RecipeSuitableForDietDetailPage,
      resolve: {
        data: RecipeSuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RecipeSuitableForDietUpdatePage,
      resolve: {
        data: RecipeSuitableForDietResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RecipeSuitableForDietPage,
        RecipeSuitableForDietUpdatePage,
        RecipeSuitableForDietDetailPage
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
export class RecipeSuitableForDietPageModule {
}
