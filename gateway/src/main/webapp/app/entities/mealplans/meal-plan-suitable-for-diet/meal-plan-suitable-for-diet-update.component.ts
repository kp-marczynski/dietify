import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealPlanSuitableForDiet, MealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from 'app/entities/mealplans/meal-plan';

@Component({
  selector: 'jhi-meal-plan-suitable-for-diet-update',
  templateUrl: './meal-plan-suitable-for-diet-update.component.html'
})
export class MealPlanSuitableForDietUpdateComponent implements OnInit {
  isSaving: boolean;

  mealplans: IMealPlan[];

  editForm = this.fb.group({
    id: [],
    dietTypeId: [null, [Validators.required]],
    mealPlanId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealPlanSuitableForDietService: MealPlanSuitableForDietService,
    protected mealPlanService: MealPlanService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealPlanSuitableForDiet }) => {
      this.updateForm(mealPlanSuitableForDiet);
    });
    this.mealPlanService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealPlan[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealPlan[]>) => response.body)
      )
      .subscribe((res: IMealPlan[]) => (this.mealplans = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealPlanSuitableForDiet: IMealPlanSuitableForDiet) {
    this.editForm.patchValue({
      id: mealPlanSuitableForDiet.id,
      dietTypeId: mealPlanSuitableForDiet.dietTypeId,
      mealPlanId: mealPlanSuitableForDiet.mealPlanId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealPlanSuitableForDiet = this.createFromForm();
    if (mealPlanSuitableForDiet.id !== undefined) {
      this.subscribeToSaveResponse(this.mealPlanSuitableForDietService.update(mealPlanSuitableForDiet));
    } else {
      this.subscribeToSaveResponse(this.mealPlanSuitableForDietService.create(mealPlanSuitableForDiet));
    }
  }

  private createFromForm(): IMealPlanSuitableForDiet {
    return {
      ...new MealPlanSuitableForDiet(),
      id: this.editForm.get(['id']).value,
      dietTypeId: this.editForm.get(['dietTypeId']).value,
      mealPlanId: this.editForm.get(['mealPlanId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlanSuitableForDiet>>) {
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

  trackMealPlanById(index: number, item: IMealPlan) {
    return item.id;
  }
}
