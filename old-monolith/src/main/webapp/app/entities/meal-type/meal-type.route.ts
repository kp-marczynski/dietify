import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealType } from 'app/shared/model/meal-type.model';
import { MealTypeService } from './meal-type.service';
import { MealTypeComponent } from './meal-type.component';
import { MealTypeDetailComponent } from './meal-type-detail.component';
import { MealTypeUpdateComponent } from './meal-type-update.component';
import { MealTypeDeletePopupComponent } from './meal-type-delete-dialog.component';
import { IMealType } from 'app/shared/model/meal-type.model';

@Injectable({ providedIn: 'root' })
export class MealTypeResolve implements Resolve<IMealType> {
    constructor(private service: MealTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MealType>) => response.ok),
                map((mealType: HttpResponse<MealType>) => mealType.body)
            );
        }
        return of(new MealType());
    }
}

export const mealTypeRoute: Routes = [
    {
        path: '',
        component: MealTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealTypeDetailComponent,
        resolve: {
            mealType: MealTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealTypeUpdateComponent,
        resolve: {
            mealType: MealTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealTypeUpdateComponent,
        resolve: {
            mealType: MealTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealTypeDeletePopupComponent,
        resolve: {
            mealType: MealTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
