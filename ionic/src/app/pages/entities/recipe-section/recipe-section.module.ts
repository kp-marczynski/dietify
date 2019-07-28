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

import { RecipeSectionPage } from './recipe-section';
import { RecipeSectionUpdatePage } from './recipe-section-update';
import { RecipeSection, RecipeSectionService, RecipeSectionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RecipeSectionResolve implements Resolve<RecipeSection> {
  constructor(private service: RecipeSectionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeSection> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecipeSection>) => response.ok),
        map((recipeSection: HttpResponse<RecipeSection>) => recipeSection.body)
      );
    }
    return of(new RecipeSection());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RecipeSectionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RecipeSectionUpdatePage,
      resolve: {
        data: RecipeSectionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RecipeSectionDetailPage,
      resolve: {
        data: RecipeSectionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RecipeSectionUpdatePage,
      resolve: {
        data: RecipeSectionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RecipeSectionPage,
        RecipeSectionUpdatePage,
        RecipeSectionDetailPage
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
export class RecipeSectionPageModule {
}
