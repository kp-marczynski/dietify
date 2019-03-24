import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductSubcategory } from 'app/shared/model/product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from 'app/entities/product-category';

@Component({
    selector: 'jhi-product-subcategory-update',
    templateUrl: './product-subcategory-update.component.html'
})
export class ProductSubcategoryUpdateComponent implements OnInit {
    productSubcategory: IProductSubcategory;
    isSaving: boolean;

    productcategories: IProductCategory[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productSubcategoryService: ProductSubcategoryService,
        protected productCategoryService: ProductCategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productSubcategory }) => {
            this.productSubcategory = productSubcategory;
        });
        this.productCategoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductCategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductCategory[]>) => response.body)
            )
            .subscribe((res: IProductCategory[]) => (this.productcategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productSubcategory.id !== undefined) {
            this.subscribeToSaveResponse(this.productSubcategoryService.update(this.productSubcategory));
        } else {
            this.subscribeToSaveResponse(this.productSubcategoryService.create(this.productSubcategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSubcategory>>) {
        result.subscribe((res: HttpResponse<IProductSubcategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductCategoryById(index: number, item: IProductCategory) {
        return item.id;
    }
}
