import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductSubcategory, ProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';
import { IProductCategory } from 'app/shared/model/products/product-category.model';
import { ProductCategoryService } from 'app/entities/products/product-category';

@Component({
  selector: 'jhi-product-subcategory-update',
  templateUrl: './product-subcategory-update.component.html'
})
export class ProductSubcategoryUpdateComponent implements OnInit {
  isSaving: boolean;

  productcategories: IProductCategory[];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    categoryId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productSubcategoryService: ProductSubcategoryService,
    protected productCategoryService: ProductCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productSubcategory }) => {
      this.updateForm(productSubcategory);
    });
    this.productCategoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductCategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductCategory[]>) => response.body)
      )
      .subscribe((res: IProductCategory[]) => (this.productcategories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productSubcategory: IProductSubcategory) {
    this.editForm.patchValue({
      id: productSubcategory.id,
      description: productSubcategory.description,
      categoryId: productSubcategory.categoryId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productSubcategory = this.createFromForm();
    if (productSubcategory.id !== undefined) {
      this.subscribeToSaveResponse(this.productSubcategoryService.update(productSubcategory));
    } else {
      this.subscribeToSaveResponse(this.productSubcategoryService.create(productSubcategory));
    }
  }

  private createFromForm(): IProductSubcategory {
    return {
      ...new ProductSubcategory(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      categoryId: this.editForm.get(['categoryId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSubcategory>>) {
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
