import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealProduct, MealProduct } from 'app/shared/model/mealplans/meal-product.model';
import { MealProductService } from './meal-product.service';
import { IMeal } from 'app/shared/model/mealplans/meal.model';
import { MealService } from 'app/entities/mealplans/meal';

@Component({
  selector: 'jhi-meal-product-update',
  templateUrl: './meal-product-update.component.html'
})
export class MealProductUpdateComponent implements OnInit {
  isSaving: boolean;

  meals: IMeal[];

  editForm = this.fb.group({
    id: [],
    productId: [null, [Validators.required]],
    householdMeasureId: [],
    amount: [null, [Validators.required, Validators.min(0)]],
    meal: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealProductService: MealProductService,
    protected mealService: MealService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealProduct }) => {
      this.updateForm(mealProduct);
    });
    this.mealService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMeal[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMeal[]>) => response.body)
      )
      .subscribe((res: IMeal[]) => (this.meals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealProduct: IMealProduct) {
    this.editForm.patchValue({
      id: mealProduct.id,
      productId: mealProduct.productId,
      householdMeasureId: mealProduct.householdMeasureId,
      amount: mealProduct.amount,
      meal: mealProduct.meal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealProduct = this.createFromForm();
    if (mealProduct.id !== undefined) {
      this.subscribeToSaveResponse(this.mealProductService.update(mealProduct));
    } else {
      this.subscribeToSaveResponse(this.mealProductService.create(mealProduct));
    }
  }

  private createFromForm(): IMealProduct {
    return {
      ...new MealProduct(),
      id: this.editForm.get(['id']).value,
      productId: this.editForm.get(['productId']).value,
      householdMeasureId: this.editForm.get(['householdMeasureId']).value,
      amount: this.editForm.get(['amount']).value,
      meal: this.editForm.get(['meal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealProduct>>) {
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

  trackMealById(index: number, item: IMeal) {
    return item.id;
  }
}
