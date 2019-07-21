import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductPortion, ProductPortion } from 'app/shared/model/recipes/product-portion.model';
import { ProductPortionService } from './product-portion.service';
import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { RecipeSectionService } from 'app/entities/recipes/recipe-section';

@Component({
  selector: 'jhi-product-portion-update',
  templateUrl: './product-portion-update.component.html'
})
export class ProductPortionUpdateComponent implements OnInit {
  isSaving: boolean;

  recipesections: IRecipeSection[];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required, Validators.min(0)]],
    productId: [null, [Validators.required]],
    householdMeasureId: [],
    recipeSectionId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productPortionService: ProductPortionService,
    protected recipeSectionService: RecipeSectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productPortion }) => {
      this.updateForm(productPortion);
    });
    this.recipeSectionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipeSection[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipeSection[]>) => response.body)
      )
      .subscribe((res: IRecipeSection[]) => (this.recipesections = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productPortion: IProductPortion) {
    this.editForm.patchValue({
      id: productPortion.id,
      amount: productPortion.amount,
      productId: productPortion.productId,
      householdMeasureId: productPortion.householdMeasureId,
      recipeSectionId: productPortion.recipeSectionId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productPortion = this.createFromForm();
    if (productPortion.id !== undefined) {
      this.subscribeToSaveResponse(this.productPortionService.update(productPortion));
    } else {
      this.subscribeToSaveResponse(this.productPortionService.create(productPortion));
    }
  }

  private createFromForm(): IProductPortion {
    return {
      ...new ProductPortion(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      productId: this.editForm.get(['productId']).value,
      householdMeasureId: this.editForm.get(['householdMeasureId']).value,
      recipeSectionId: this.editForm.get(['recipeSectionId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductPortion>>) {
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

  trackRecipeSectionById(index: number, item: IRecipeSection) {
    return item.id;
  }
}
