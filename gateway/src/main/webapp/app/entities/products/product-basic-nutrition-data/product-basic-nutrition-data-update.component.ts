import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductBasicNutritionData, ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';
import { IProduct } from 'app/shared/model/products/product.model';
import { ProductService } from 'app/entities/products/product';

@Component({
  selector: 'jhi-product-basic-nutrition-data-update',
  templateUrl: './product-basic-nutrition-data-update.component.html'
})
export class ProductBasicNutritionDataUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    energy: [null, [Validators.required, Validators.min(0)]],
    protein: [null, [Validators.required, Validators.min(0)]],
    fat: [null, [Validators.required, Validators.min(0)]],
    carbohydrates: [null, [Validators.required, Validators.min(0)]],
    productId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productBasicNutritionDataService: ProductBasicNutritionDataService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productBasicNutritionData }) => {
      this.updateForm(productBasicNutritionData);
    });
    this.productService
      .query({ filter: 'basicnutritiondata-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe(
        (res: IProduct[]) => {
          if (!!this.editForm.get('productId').value) {
            this.products = res;
          } else {
            this.productService
              .find(this.editForm.get('productId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IProduct>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IProduct>) => subResponse.body)
              )
              .subscribe(
                (subRes: IProduct) => (this.products = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(productBasicNutritionData: IProductBasicNutritionData) {
    this.editForm.patchValue({
      id: productBasicNutritionData.id,
      energy: productBasicNutritionData.energy,
      protein: productBasicNutritionData.protein,
      fat: productBasicNutritionData.fat,
      carbohydrates: productBasicNutritionData.carbohydrates,
      productId: productBasicNutritionData.productId
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
      carbohydrates: this.editForm.get(['carbohydrates']).value,
      productId: this.editForm.get(['productId']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
