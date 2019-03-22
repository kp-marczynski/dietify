import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { INutritionData } from 'app/shared/model/nutrition-data.model';
import { NutritionDataService } from './nutrition-data.service';
import { INutritionDefinition } from 'app/shared/model/nutrition-definition.model';
import { NutritionDefinitionService } from 'app/entities/nutrition-definition';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-nutrition-data-update',
    templateUrl: './nutrition-data-update.component.html'
})
export class NutritionDataUpdateComponent implements OnInit {
    nutritionData: INutritionData;
    isSaving: boolean;

    nutritiondefinitions: INutritionDefinition[];

    products: IProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected nutritionDataService: NutritionDataService,
        protected nutritionDefinitionService: NutritionDefinitionService,
        protected productService: ProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nutritionData }) => {
            this.nutritionData = nutritionData;
        });
        this.nutritionDefinitionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<INutritionDefinition[]>) => mayBeOk.ok),
                map((response: HttpResponse<INutritionDefinition[]>) => response.body)
            )
            .subscribe(
                (res: INutritionDefinition[]) => (this.nutritiondefinitions = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.productService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProduct[]>) => response.body)
            )
            .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nutritionData.id !== undefined) {
            this.subscribeToSaveResponse(this.nutritionDataService.update(this.nutritionData));
        } else {
            this.subscribeToSaveResponse(this.nutritionDataService.create(this.nutritionData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INutritionData>>) {
        result.subscribe((res: HttpResponse<INutritionData>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNutritionDefinitionById(index: number, item: INutritionDefinition) {
        return item.id;
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
}
