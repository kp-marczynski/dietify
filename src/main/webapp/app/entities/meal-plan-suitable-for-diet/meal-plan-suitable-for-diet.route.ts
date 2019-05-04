import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealPlanSuitableForDiet } from 'app/shared/model/meal-plan-suitable-for-diet.model';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';
import { MealPlanSuitableForDietComponent } from './meal-plan-suitable-for-diet.component';
import { MealPlanSuitableForDietDetailComponent } from './meal-plan-suitable-for-diet-detail.component';
import { MealPlanSuitableForDietUpdateComponent } from './meal-plan-suitable-for-diet-update.component';
import { MealPlanSuitableForDietDeletePopupComponent } from './meal-plan-suitable-for-diet-delete-dialog.component';
import { IMealPlanSuitableForDiet } from 'app/shared/model/meal-plan-suitable-for-diet.model';

@Injectable({ providedIn: 'root' })
export class MealPlanSuitableForDietResolve implements Resolve<IMealPlanSuitableForDiet> {
    constructor(private service: MealPlanSuitableForDietService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealPlanSuitableForDiet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MealPlanSuitableForDiet>) => response.ok),
                map((mealPlanSuitableForDiet: HttpResponse<MealPlanSuitableForDiet>) => mealPlanSuitableForDiet.body)
            );
        }
        return of(new MealPlanSuitableForDiet());
    }
}

export const mealPlanSuitableForDietRoute: Routes = [
    {
        path: '',
        component: MealPlanSuitableForDietComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanSuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealPlanSuitableForDietDetailComponent,
        resolve: {
            mealPlanSuitableForDiet: MealPlanSuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanSuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealPlanSuitableForDietUpdateComponent,
        resolve: {
            mealPlanSuitableForDiet: MealPlanSuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanSuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealPlanSuitableForDietUpdateComponent,
        resolve: {
            mealPlanSuitableForDiet: MealPlanSuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanSuitableForDiets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealPlanSuitableForDietPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealPlanSuitableForDietDeletePopupComponent,
        resolve: {
            mealPlanSuitableForDiet: MealPlanSuitableForDietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealPlanSuitableForDiets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
