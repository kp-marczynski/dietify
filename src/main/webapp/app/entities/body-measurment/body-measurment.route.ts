import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BodyMeasurment } from 'app/shared/model/body-measurment.model';
import { BodyMeasurmentService } from './body-measurment.service';
import { BodyMeasurmentComponent } from './body-measurment.component';
import { BodyMeasurmentDetailComponent } from './body-measurment-detail.component';
import { BodyMeasurmentUpdateComponent } from './body-measurment-update.component';
import { BodyMeasurmentDeletePopupComponent } from './body-measurment-delete-dialog.component';
import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';

@Injectable({ providedIn: 'root' })
export class BodyMeasurmentResolve implements Resolve<IBodyMeasurment> {
    constructor(private service: BodyMeasurmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBodyMeasurment> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BodyMeasurment>) => response.ok),
                map((bodyMeasurment: HttpResponse<BodyMeasurment>) => bodyMeasurment.body)
            );
        }
        return of(new BodyMeasurment());
    }
}

export const bodyMeasurmentRoute: Routes = [
    {
        path: '',
        component: BodyMeasurmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BodyMeasurments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BodyMeasurmentDetailComponent,
        resolve: {
            bodyMeasurment: BodyMeasurmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BodyMeasurments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BodyMeasurmentUpdateComponent,
        resolve: {
            bodyMeasurment: BodyMeasurmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BodyMeasurments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BodyMeasurmentUpdateComponent,
        resolve: {
            bodyMeasurment: BodyMeasurmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BodyMeasurments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bodyMeasurmentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BodyMeasurmentDeletePopupComponent,
        resolve: {
            bodyMeasurment: BodyMeasurmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BodyMeasurments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
