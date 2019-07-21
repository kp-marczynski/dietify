import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DietType } from 'app/shared/model/diet-type.model';
import { DietTypeService } from './diet-type.service';
import { DietTypeComponent } from './diet-type.component';
import { DietTypeDetailComponent } from './diet-type-detail.component';
import { DietTypeUpdateComponent } from './diet-type-update.component';
import { DietTypeDeletePopupComponent } from './diet-type-delete-dialog.component';
import { IDietType } from 'app/shared/model/diet-type.model';

@Injectable({ providedIn: 'root' })
export class DietTypeResolve implements Resolve<IDietType> {
    constructor(private service: DietTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDietType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DietType>) => response.ok),
                map((dietType: HttpResponse<DietType>) => dietType.body)
            );
        }
        return of(new DietType());
    }
}

export const dietTypeRoute: Routes = [
    {
        path: '',
        component: DietTypeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'DietTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DietTypeDetailComponent,
        resolve: {
            dietType: DietTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DietTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DietTypeUpdateComponent,
        resolve: {
            dietType: DietTypeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'DietTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DietTypeUpdateComponent,
        resolve: {
            dietType: DietTypeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'DietTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dietTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DietTypeDeletePopupComponent,
        resolve: {
            dietType: DietTypeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'DietTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
