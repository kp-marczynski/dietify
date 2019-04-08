import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DishType } from 'app/shared/model/dish-type.model';
import { DishTypeService } from './dish-type.service';
import { DishTypeComponent } from './dish-type.component';
import { DishTypeDetailComponent } from './dish-type-detail.component';
import { DishTypeUpdateComponent } from './dish-type-update.component';
import { DishTypeDeletePopupComponent } from './dish-type-delete-dialog.component';
import { IDishType } from 'app/shared/model/dish-type.model';

@Injectable({ providedIn: 'root' })
export class DishTypeResolve implements Resolve<IDishType> {
    constructor(private service: DishTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDishType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DishType>) => response.ok),
                map((dishType: HttpResponse<DishType>) => dishType.body)
            );
        }
        return of(new DishType());
    }
}

export const dishTypeRoute: Routes = [
    {
        path: '',
        component: DishTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DishTypeDetailComponent,
        resolve: {
            dishType: DishTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DishTypeUpdateComponent,
        resolve: {
            dishType: DishTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DishTypeUpdateComponent,
        resolve: {
            dishType: DishTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dishTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DishTypeDeletePopupComponent,
        resolve: {
            dishType: DishTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
