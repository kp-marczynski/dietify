import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductSubcategory } from 'app/shared/model/product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';
import { ProductSubcategoryComponent } from './product-subcategory.component';
import { ProductSubcategoryDetailComponent } from './product-subcategory-detail.component';
import { ProductSubcategoryUpdateComponent } from './product-subcategory-update.component';
import { ProductSubcategoryDeletePopupComponent } from './product-subcategory-delete-dialog.component';
import { IProductSubcategory } from 'app/shared/model/product-subcategory.model';

@Injectable({ providedIn: 'root' })
export class ProductSubcategoryResolve implements Resolve<IProductSubcategory> {
    constructor(private service: ProductSubcategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductSubcategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductSubcategory>) => response.ok),
                map((productSubcategory: HttpResponse<ProductSubcategory>) => productSubcategory.body)
            );
        }
        return of(new ProductSubcategory());
    }
}

export const productSubcategoryRoute: Routes = [
    {
        path: '',
        component: ProductSubcategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSubcategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductSubcategoryDetailComponent,
        resolve: {
            productSubcategory: ProductSubcategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSubcategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductSubcategoryUpdateComponent,
        resolve: {
            productSubcategory: ProductSubcategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSubcategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductSubcategoryUpdateComponent,
        resolve: {
            productSubcategory: ProductSubcategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSubcategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productSubcategoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductSubcategoryDeletePopupComponent,
        resolve: {
            productSubcategory: ProductSubcategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSubcategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
