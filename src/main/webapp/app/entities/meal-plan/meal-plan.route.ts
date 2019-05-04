import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealPlan } from 'app/shared/model/meal-plan.model';
import { MealPlanService } from './meal-plan.service';
import { MealPlanComponent } from './meal-plan.component';
import { MealPlanDetailComponent } from './meal-plan-detail.component';
import { MealPlanUpdateComponent } from './meal-plan-update.component';
import { MealPlanDeletePopupComponent } from './meal-plan-delete-dialog.component';
import { IMealPlan } from 'app/shared/model/meal-plan.model';

@Injectable({ providedIn: 'root' })
export class MealPlanResolve implements Resolve<IMealPlan> {
    constructor(private service: MealPlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealPlan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MealPlan>) => response.ok),
                map((mealPlan: HttpResponse<MealPlan>) => mealPlan.body)
            );
        }
        return of(new MealPlan());
    }
}

export const mealPlanRoute: Routes = [
    {
        path: '',
        component: MealPlanComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'MealPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealPlanDetailComponent,
        resolve: {
            mealPlan: MealPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealPlanUpdateComponent,
        resolve: {
            mealPlan: MealPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealPlanUpdateComponent,
        resolve: {
            mealPlan: MealPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealPlanPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealPlanDeletePopupComponent,
        resolve: {
            mealPlan: MealPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
