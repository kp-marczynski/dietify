import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PreparationStep } from 'app/shared/model/preparation-step.model';
import { PreparationStepService } from './preparation-step.service';
import { PreparationStepComponent } from './preparation-step.component';
import { PreparationStepDetailComponent } from './preparation-step-detail.component';
import { PreparationStepUpdateComponent } from './preparation-step-update.component';
import { PreparationStepDeletePopupComponent } from './preparation-step-delete-dialog.component';
import { IPreparationStep } from 'app/shared/model/preparation-step.model';

@Injectable({ providedIn: 'root' })
export class PreparationStepResolve implements Resolve<IPreparationStep> {
    constructor(private service: PreparationStepService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPreparationStep> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PreparationStep>) => response.ok),
                map((preparationStep: HttpResponse<PreparationStep>) => preparationStep.body)
            );
        }
        return of(new PreparationStep());
    }
}

export const preparationStepRoute: Routes = [
    {
        path: '',
        component: PreparationStepComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PreparationSteps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PreparationStepDetailComponent,
        resolve: {
            preparationStep: PreparationStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PreparationSteps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PreparationStepUpdateComponent,
        resolve: {
            preparationStep: PreparationStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PreparationSteps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PreparationStepUpdateComponent,
        resolve: {
            preparationStep: PreparationStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PreparationSteps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preparationStepPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PreparationStepDeletePopupComponent,
        resolve: {
            preparationStep: PreparationStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PreparationSteps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
