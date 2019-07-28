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

import { KitchenApplianceTranslationPage } from './kitchen-appliance-translation';
import { KitchenApplianceTranslationUpdatePage } from './kitchen-appliance-translation-update';
import { KitchenApplianceTranslation, KitchenApplianceTranslationService, KitchenApplianceTranslationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class KitchenApplianceTranslationResolve implements Resolve<KitchenApplianceTranslation> {
  constructor(private service: KitchenApplianceTranslationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KitchenApplianceTranslation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<KitchenApplianceTranslation>) => response.ok),
        map((kitchenApplianceTranslation: HttpResponse<KitchenApplianceTranslation>) => kitchenApplianceTranslation.body)
      );
    }
    return of(new KitchenApplianceTranslation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: KitchenApplianceTranslationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: KitchenApplianceTranslationUpdatePage,
      resolve: {
        data: KitchenApplianceTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: KitchenApplianceTranslationDetailPage,
      resolve: {
        data: KitchenApplianceTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: KitchenApplianceTranslationUpdatePage,
      resolve: {
        data: KitchenApplianceTranslationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        KitchenApplianceTranslationPage,
        KitchenApplianceTranslationUpdatePage,
        KitchenApplianceTranslationDetailPage
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
export class KitchenApplianceTranslationPageModule {
}
