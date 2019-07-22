import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealPlanUnsuitableForDiet, MealPlanUnsuitableForDiet } from 'app/shared/model/mealplans/meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from 'app/entities/mealplans/meal-plan';

@Component({
  selector: 'jhi-meal-plan-unsuitable-for-diet-update',
  templateUrl: './meal-plan-unsuitable-for-diet-update.component.html'
})
export class MealPlanUnsuitableForDietUpdateComponent implements OnInit {
  isSaving: boolean;

  mealplans: IMealPlan[];

  editForm = this.fb.group({
    id: [],
    dietTypeId: [null, [Validators.required]],
    mealPlan: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService,
    protected mealPlanService: MealPlanService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealPlanUnsuitableForDiet }) => {
      this.updateForm(mealPlanUnsuitableForDiet);
    });
    this.mealPlanService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealPlan[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealPlan[]>) => response.body)
      )
      .subscribe((res: IMealPlan[]) => (this.mealplans = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealPlanUnsuitableForDiet: IMealPlanUnsuitableForDiet) {
    this.editForm.patchValue({
      id: mealPlanUnsuitableForDiet.id,
      dietTypeId: mealPlanUnsuitableForDiet.dietTypeId,
      mealPlan: mealPlanUnsuitableForDiet.mealPlan
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealPlanUnsuitableForDiet = this.createFromForm();
    if (mealPlanUnsuitableForDiet.id !== undefined) {
      this.subscribeToSaveResponse(this.mealPlanUnsuitableForDietService.update(mealPlanUnsuitableForDiet));
    } else {
      this.subscribeToSaveResponse(this.mealPlanUnsuitableForDietService.create(mealPlanUnsuitableForDiet));
    }
  }

  private createFromForm(): IMealPlanUnsuitableForDiet {
    return {
      ...new MealPlanUnsuitableForDiet(),
      id: this.editForm.get(['id']).value,
      dietTypeId: this.editForm.get(['dietTypeId']).value,
      mealPlan: this.editForm.get(['mealPlan']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlanUnsuitableForDiet>>) {
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
