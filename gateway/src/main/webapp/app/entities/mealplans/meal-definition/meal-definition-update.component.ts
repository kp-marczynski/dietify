import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealDefinition, MealDefinition } from 'app/shared/model/mealplans/meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from 'app/entities/mealplans/meal-plan';

@Component({
  selector: 'jhi-meal-definition-update',
  templateUrl: './meal-definition-update.component.html'
})
export class MealDefinitionUpdateComponent implements OnInit {
  isSaving: boolean;

  mealplans: IMealPlan[];

  editForm = this.fb.group({
    id: [],
    ordinalNumber: [null, [Validators.required, Validators.min(1)]],
    mealTypeId: [null, [Validators.required]],
    timeOfMeal: [null, [Validators.required, Validators.pattern('d{2}:d{2}')]],
    percentOfEnergy: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    mealPlanId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealDefinitionService: MealDefinitionService,
    protected mealPlanService: MealPlanService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealDefinition }) => {
      this.updateForm(mealDefinition);
    });
    this.mealPlanService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealPlan[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealPlan[]>) => response.body)
      )
      .subscribe((res: IMealPlan[]) => (this.mealplans = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealDefinition: IMealDefinition) {
    this.editForm.patchValue({
      id: mealDefinition.id,
      ordinalNumber: mealDefinition.ordinalNumber,
      mealTypeId: mealDefinition.mealTypeId,
      timeOfMeal: mealDefinition.timeOfMeal,
      percentOfEnergy: mealDefinition.percentOfEnergy,
      mealPlanId: mealDefinition.mealPlanId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealDefinition = this.createFromForm();
    if (mealDefinition.id !== undefined) {
      this.subscribeToSaveResponse(this.mealDefinitionService.update(mealDefinition));
    } else {
      this.subscribeToSaveResponse(this.mealDefinitionService.create(mealDefinition));
    }
  }

  private createFromForm(): IMealDefinition {
    return {
      ...new MealDefinition(),
      id: this.editForm.get(['id']).value,
      ordinalNumber: this.editForm.get(['ordinalNumber']).value,
      mealTypeId: this.editForm.get(['mealTypeId']).value,
      timeOfMeal: this.editForm.get(['timeOfMeal']).value,
      percentOfEnergy: this.editForm.get(['percentOfEnergy']).value,
      mealPlanId: this.editForm.get(['mealPlanId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealDefinition>>) {
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
