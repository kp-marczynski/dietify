import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/products/product.model';
import { ProductService } from './product.service';
import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { ProductSubcategoryService } from 'app/entities/products/product-subcategory';
import { IDietType } from 'app/shared/model/products/diet-type.model';
import { DietTypeService } from 'app/entities/products/diet-type';
import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from 'app/entities/products/product-basic-nutrition-data';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  productsubcategories: IProductSubcategory[];

  diettypes: IDietType[];

  productbasicnutritiondata: IProductBasicNutritionData[];

  editForm = this.fb.group({
    id: [],
    source: [null, [Validators.minLength(1), Validators.maxLength(255)]],
    authorId: [],
    description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    isFinal: [null, [Validators.required]],
    isVerified: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    subcategoryId: [null, Validators.required],
    suitableDiets: [],
    unsuitableDiets: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected productSubcategoryService: ProductSubcategoryService,
    protected dietTypeService: DietTypeService,
    protected productBasicNutritionDataService: ProductBasicNutritionDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.productSubcategoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductSubcategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductSubcategory[]>) => response.body)
      )
      .subscribe((res: IProductSubcategory[]) => (this.productsubcategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dietTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDietType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDietType[]>) => response.body)
      )
      .subscribe((res: IDietType[]) => (this.diettypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productBasicNutritionDataService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductBasicNutritionData[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductBasicNutritionData[]>) => response.body)
      )
      .subscribe(
        (res: IProductBasicNutritionData[]) => (this.productbasicnutritiondata = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      source: product.source,
      authorId: product.authorId,
      description: product.description,
      isFinal: product.isFinal,
      isVerified: product.isVerified,
      language: product.language,
      subcategoryId: product.subcategoryId,
      suitableDiets: product.suitableDiets,
      unsuitableDiets: product.unsuitableDiets
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      source: this.editForm.get(['source']).value,
      authorId: this.editForm.get(['authorId']).value,
      description: this.editForm.get(['description']).value,
      isFinal: this.editForm.get(['isFinal']).value,
      isVerified: this.editForm.get(['isVerified']).value,
      language: this.editForm.get(['language']).value,
      subcategoryId: this.editForm.get(['subcategoryId']).value,
      suitableDiets: this.editForm.get(['suitableDiets']).value,
      unsuitableDiets: this.editForm.get(['unsuitableDiets']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
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

  trackProductSubcategoryById(index: number, item: IProductSubcategory) {
    return item.id;
  }

  trackDietTypeById(index: number, item: IDietType) {
    return item.id;
  }

  trackProductBasicNutritionDataById(index: number, item: IProductBasicNutritionData) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
