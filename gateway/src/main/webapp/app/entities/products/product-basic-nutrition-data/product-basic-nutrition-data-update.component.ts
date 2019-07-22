import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductBasicNutritionData, ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';

@Component({
  selector: 'jhi-product-basic-nutrition-data-update',
  templateUrl: './product-basic-nutrition-data-update.component.html'
})
export class ProductBasicNutritionDataUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    energy: [null, [Validators.required, Validators.min(0)]],
    protein: [null, [Validators.required, Validators.min(0)]],
    fat: [null, [Validators.required, Validators.min(0)]],
    carbohydrates: [null, [Validators.required, Validators.min(0)]]
  });

  constructor(
    protected productBasicNutritionDataService: ProductBasicNutritionDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productBasicNutritionData }) => {
      this.updateForm(productBasicNutritionData);
    });
  }

  updateForm(productBasicNutritionData: IProductBasicNutritionData) {
    this.editForm.patchValue({
      id: productBasicNutritionData.id,
      energy: productBasicNutritionData.energy,
      protein: productBasicNutritionData.protein,
      fat: productBasicNutritionData.fat,
      carbohydrates: productBasicNutritionData.carbohydrates
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productBasicNutritionData = this.createFromForm();
    if (productBasicNutritionData.id !== undefined) {
      this.subscribeToSaveResponse(this.productBasicNutritionDataService.update(productBasicNutritionData));
    } else {
      this.subscribeToSaveResponse(this.productBasicNutritionDataService.create(productBasicNutritionData));
    }
  }

  private createFromForm(): IProductBasicNutritionData {
    return {
      ...new ProductBasicNutritionData(),
      id: this.editForm.get(['id']).value,
      energy: this.editForm.get(['energy']).value,
      protein: this.editForm.get(['protein']).value,
      fat: this.editForm.get(['fat']).value,
      carbohydrates: this.editForm.get(['carbohydrates']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductBasicNutritionData>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
