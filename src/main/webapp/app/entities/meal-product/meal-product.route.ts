import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MealProduct } from 'app/shared/model/meal-product.model';
import { MealProductService } from './meal-product.service';
import { MealProductComponent } from './meal-product.component';
import { MealProductDetailComponent } from './meal-product-detail.component';
import { MealProductUpdateComponent } from './meal-product-update.component';
import { MealProductDeletePopupComponent } from './meal-product-delete-dialog.component';
import { IMealProduct } from 'app/shared/model/meal-product.model';

@Injectable({ providedIn: 'root' })
export class MealProductResolve implements Resolve<IMealProduct> {
    constructor(private service: MealProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMealProduct> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MealProduct>) => response.ok),
                map((mealProduct: HttpResponse<MealProduct>) => mealProduct.body)
            );
        }
        return of(new MealProduct());
    }
}

export const mealProductRoute: Routes = [
    {
        path: '',
        component: MealProductComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealProductDetailComponent,
        resolve: {
            mealProduct: MealProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealProductUpdateComponent,
        resolve: {
            mealProduct: MealProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealProductUpdateComponent,
        resolve: {
            mealProduct: MealProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealProducts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealProductPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealProductDeletePopupComponent,
        resolve: {
            mealProduct: MealProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealProducts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
