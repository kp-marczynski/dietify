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

import { DishTypePage } from './dish-type';
import { DishTypeUpdatePage } from './dish-type-update';
import { DishType, DishTypeService, DishTypeDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class DishTypeResolve implements Resolve<DishType> {
  constructor(private service: DishTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DishType> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DishType>) => response.ok),
        map((dishType: HttpResponse<DishType>) => dishType.body)
      );
    }
    return of(new DishType());
  }
}

const routes: Routes = [
    {
      path: '',
      component: DishTypePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: DishTypeUpdatePage,
      resolve: {
        data: DishTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: DishTypeDetailPage,
      resolve: {
        data: DishTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: DishTypeUpdatePage,
      resolve: {
        data: DishTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        DishTypePage,
        DishTypeUpdatePage,
        DishTypeDetailPage
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
export class DishTypePageModule {
}
