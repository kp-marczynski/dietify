import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dietetician } from 'app/shared/model/dietetician.model';
import { DieteticianService } from './dietetician.service';
import { DieteticianComponent } from './dietetician.component';
import { DieteticianDetailComponent } from './dietetician-detail.component';
import { DieteticianUpdateComponent } from './dietetician-update.component';
import { DieteticianDeletePopupComponent } from './dietetician-delete-dialog.component';
import { IDietetician } from 'app/shared/model/dietetician.model';

@Injectable({ providedIn: 'root' })
export class DieteticianResolve implements Resolve<IDietetician> {
    constructor(private service: DieteticianService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDietetician> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Dietetician>) => response.ok),
                map((dietetician: HttpResponse<Dietetician>) => dietetician.body)
            );
        }
        return of(new Dietetician());
    }
}

export const dieteticianRoute: Routes = [
    {
        path: '',
        component: DieteticianComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dieteticians'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DieteticianDetailComponent,
        resolve: {
            dietetician: DieteticianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dieteticians'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DieteticianUpdateComponent,
        resolve: {
            dietetician: DieteticianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dieteticians'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DieteticianUpdateComponent,
        resolve: {
            dietetician: DieteticianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dieteticians'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dieteticianPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DieteticianDeletePopupComponent,
        resolve: {
            dietetician: DieteticianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dieteticians'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
