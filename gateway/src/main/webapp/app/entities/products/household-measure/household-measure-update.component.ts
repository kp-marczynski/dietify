import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHouseholdMeasure, HouseholdMeasure } from 'app/shared/model/products/household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';
import { IProduct } from 'app/shared/model/products/product.model';
import { ProductService } from 'app/entities/products/product';

@Component({
  selector: 'jhi-household-measure-update',
  templateUrl: './household-measure-update.component.html'
})
export class HouseholdMeasureUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    gramsWeight: [null, [Validators.required, Validators.min(0)]],
    isVisible: [null, [Validators.required]],
    product: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected householdMeasureService: HouseholdMeasureService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ householdMeasure }) => {
      this.updateForm(householdMeasure);
    });
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(householdMeasure: IHouseholdMeasure) {
    this.editForm.patchValue({
      id: householdMeasure.id,
      description: householdMeasure.description,
      gramsWeight: householdMeasure.gramsWeight,
      isVisible: householdMeasure.isVisible,
      product: householdMeasure.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const householdMeasure = this.createFromForm();
    if (householdMeasure.id !== undefined) {
      this.subscribeToSaveResponse(this.householdMeasureService.update(householdMeasure));
    } else {
      this.subscribeToSaveResponse(this.householdMeasureService.create(householdMeasure));
    }
  }

  private createFromForm(): IHouseholdMeasure {
    return {
      ...new HouseholdMeasure(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      gramsWeight: this.editForm.get(['gramsWeight']).value,
      isVisible: this.editForm.get(['isVisible']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHouseholdMeasure>>) {
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
