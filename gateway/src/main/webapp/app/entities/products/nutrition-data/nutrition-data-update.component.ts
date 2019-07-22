import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { INutritionData, NutritionData } from 'app/shared/model/products/nutrition-data.model';
import { NutritionDataService } from './nutrition-data.service';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { NutritionDefinitionService } from 'app/entities/products/nutrition-definition';
import { IProduct } from 'app/shared/model/products/product.model';
import { ProductService } from 'app/entities/products/product';

@Component({
  selector: 'jhi-nutrition-data-update',
  templateUrl: './nutrition-data-update.component.html'
})
export class NutritionDataUpdateComponent implements OnInit {
  isSaving: boolean;

  nutritiondefinitions: INutritionDefinition[];

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    nutritionValue: [null, [Validators.required, Validators.min(0)]],
    nutritionDefinition: [null, Validators.required],
    product: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected nutritionDataService: NutritionDataService,
    protected nutritionDefinitionService: NutritionDefinitionService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nutritionData }) => {
      this.updateForm(nutritionData);
    });
    this.nutritionDefinitionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INutritionDefinition[]>) => mayBeOk.ok),
        map((response: HttpResponse<INutritionDefinition[]>) => response.body)
      )
      .subscribe((res: INutritionDefinition[]) => (this.nutritiondefinitions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(nutritionData: INutritionData) {
    this.editForm.patchValue({
      id: nutritionData.id,
      nutritionValue: nutritionData.nutritionValue,
      nutritionDefinition: nutritionData.nutritionDefinition,
      product: nutritionData.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const nutritionData = this.createFromForm();
    if (nutritionData.id !== undefined) {
      this.subscribeToSaveResponse(this.nutritionDataService.update(nutritionData));
    } else {
      this.subscribeToSaveResponse(this.nutritionDataService.create(nutritionData));
    }
  }

  private createFromForm(): INutritionData {
    return {
      ...new NutritionData(),
      id: this.editForm.get(['id']).value,
      nutritionValue: this.editForm.get(['nutritionValue']).value,
      nutritionDefinition: this.editForm.get(['nutritionDefinition']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutritionData>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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
