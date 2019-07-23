import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealDefinition } from 'app/shared/model/mealplans/meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';
import { MealDefinitionComponent } from './meal-definition.component';
import { MealDefinitionDetailComponent } from './meal-definition-detail.component';
import { MealDefinitionUpdateComponent } from './meal-definition-update.component';
import { MealDefinitionDeletePopupComponent } from './meal-definition-delete-dialog.component';
import { IMealDefinition } from 'app/shared/model/mealplans/meal-definition.model';

@Injectable({ providedIn: 'root' })
export class MealDefinitionResolve implements Resolve<IMealDefinition> {
  constructor(private service: MealDefinitionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealDefinition> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MealDefinition>) => response.ok),
        map((mealDefinition: HttpResponse<MealDefinition>) => mealDefinition.body)
      );
    }
    return of(new MealDefinition());
  }
}

export const mealDefinitionRoute: Routes = [
  {
    path: '',
    component: MealDefinitionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MealDefinitionDetailComponent,
    resolve: {
      mealDefinition: MealDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MealDefinitionUpdateComponent,
    resolve: {
      mealDefinition: MealDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MealDefinitionUpdateComponent,
    resolve: {
      mealDefinition: MealDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mealDefinitionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MealDefinitionDeletePopupComponent,
    resolve: {
      mealDefinition: MealDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.mealplansMealDefinition.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
