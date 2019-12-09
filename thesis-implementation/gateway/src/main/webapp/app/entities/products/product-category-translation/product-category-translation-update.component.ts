import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductCategoryTranslation, ProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';
import { ProductCategoryTranslationService } from './product-category-translation.service';
import { IProductCategory } from 'app/shared/model/products/product-category.model';
import { ProductCategoryService } from 'app/entities/products/product-category';

@Component({
  selector: 'jhi-product-category-translation-update',
  templateUrl: './product-category-translation-update.component.html'
})
export class ProductCategoryTranslationUpdateComponent implements OnInit {
  isSaving: boolean;

  productcategories: IProductCategory[];

  editForm = this.fb.group({
    id: [],
    translation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    productCategory: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productCategoryTranslationService: ProductCategoryTranslationService,
    protected productCategoryService: ProductCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productCategoryTranslation }) => {
      this.updateForm(productCategoryTranslation);
    });
    this.productCategoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductCategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductCategory[]>) => response.body)
      )
      .subscribe((res: IProductCategory[]) => (this.productcategories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productCategoryTranslation: IProductCategoryTranslation) {
    this.editForm.patchValue({
      id: productCategoryTranslation.id,
      translation: productCategoryTranslation.translation,
      language: productCategoryTranslation.language,
      productCategory: productCategoryTranslation.productCategory
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productCategoryTranslation = this.createFromForm();
    if (productCategoryTranslation.id !== undefined) {
      this.subscribeToSaveResponse(this.productCategoryTranslationService.update(productCategoryTranslation));
    } else {
      this.subscribeToSaveResponse(this.productCategoryTranslationService.create(productCategoryTranslation));
    }
  }

  private createFromForm(): IProductCategoryTranslation {
    return {
      ...new ProductCategoryTranslation(),
      id: this.editForm.get(['id']).value,
      translation: this.editForm.get(['translation']).value,
      language: this.editForm.get(['language']).value,
      productCategory: this.editForm.get(['productCategory']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductCategoryTranslation>>) {
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

  trackProductCategoryById(index: number, item: IProductCategory) {
    return item.id;
  }
}
