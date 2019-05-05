import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';
import { MealPlanUnsuitableForDietComponent } from './meal-plan-unsuitable-for-diet.component';
import { MealPlanUnsuitableForDietDetailComponent } from './meal-plan-unsuitable-for-diet-detail.component';
import { MealPlanUnsuitableForDietUpdateComponent } from './meal-plan-unsuitable-for-diet-update.component';
import { MealPlanUnsuitableForDietDeletePopupComponent } from './meal-plan-unsuitable-for-diet-delete-dialog.component';
import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';

@Injectable({ providedIn: 'root' })
export class MealPlanUnsuitableForDietResolve implements Resolve<IMealPlanUnsuitableForDiet> {
    constructor(private service: MealPlanUnsuitableForDietService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealPlanUnsuitableForDiet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MealPlanUnsuitableForDiet>) => response.ok),
                map((mealPlanUnsuitableForDiet: HttpResponse<MealPlanUnsuitableForDiet>) => mealPlanUnsuitableForDiet.body)
            );
        }
        return of(new MealPlanUnsuitableForDiet());
    }
}

export const mealPlanUnsuitableForDietRoute: Routes = [
    {
        path: '',
        component: MealPlanUnsuitableForDietComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanUnsuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealPlanUnsuitableForDietDetailComponent,
        resolve: {
            mealPlanUnsuitableForDiet: MealPlanUnsuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanUnsuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealPlanUnsuitableForDietUpdateComponent,
        resolve: {
            mealPlanUnsuitableForDiet: MealPlanUnsuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanUnsuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealPlanUnsuitableForDietUpdateComponent,
        resolve: {
            mealPlanUnsuitableForDiet: MealPlanUnsuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanUnsuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealPlanUnsuitableForDietPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealPlanUnsuitableForDietDeletePopupComponent,
        resolve: {
            mealPlanUnsuitableForDiet: MealPlanUnsuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanUnsuitableForDiets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
