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

import { DietTypePage } from './diet-type';
import { DietTypeUpdatePage } from './diet-type-update';
import { DietType, DietTypeService, DietTypeDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class DietTypeResolve implements Resolve<DietType> {
  constructor(private service: DietTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DietType> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DietType>) => response.ok),
        map((dietType: HttpResponse<DietType>) => dietType.body)
      );
    }
    return of(new DietType());
  }
}

const routes: Routes = [
    {
      path: '',
      component: DietTypePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: DietTypeUpdatePage,
      resolve: {
        data: DietTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: DietTypeDetailPage,
      resolve: {
        data: DietTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: DietTypeUpdatePage,
      resolve: {
        data: DietTypeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        DietTypePage,
        DietTypeUpdatePage,
        DietTypeDetailPage
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
export class DietTypePageModule {
}
