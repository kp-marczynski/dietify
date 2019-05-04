import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealProduct } from 'app/shared/model/meal-product.model';
import { MealProductService } from './meal-product.service';
import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from 'app/entities/meal';

@Component({
    selector: 'jhi-meal-product-update',
    templateUrl: './meal-product-update.component.html'
})
export class MealProductUpdateComponent implements OnInit {
    mealProduct: IMealProduct;
    isSaving: boolean;

    meals: IMeal[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mealProductService: MealProductService,
        protected mealService: MealService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealProduct }) => {
            this.mealProduct = mealProduct;
        });
        this.mealService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMeal[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMeal[]>) => response.body)
            )
            .subscribe((res: IMeal[]) => (this.meals = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealProduct.id !== undefined) {
            this.subscribeToSaveResponse(this.mealProductService.update(this.mealProduct));
        } else {
            this.subscribeToSaveResponse(this.mealProductService.create(this.mealProduct));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealProduct>>) {
        result.subscribe((res: HttpResponse<IMealProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMealById(index: number, item: IMeal) {
        return item.id;
    }
}
