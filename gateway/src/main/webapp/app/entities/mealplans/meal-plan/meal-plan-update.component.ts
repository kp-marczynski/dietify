import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IMealPlan, MealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from './meal-plan.service';

@Component({
  selector: 'jhi-meal-plan-update',
  templateUrl: './meal-plan-update.component.html'
})
export class MealPlanUpdateComponent implements OnInit {
  isSaving: boolean;
  creationDateDp: any;

  editForm = this.fb.group({
    id: [],
    authorId: [null, [Validators.required]],
    creationDate: [null, [Validators.required]],
    name: [null, [Validators.minLength(1), Validators.maxLength(255)]],
    isVisible: [null, [Validators.required]],
    isLocked: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    numberOfDays: [null, [Validators.required, Validators.min(1)]],
    numberOfMealsPerDay: [null, [Validators.required, Validators.min(1)]],
    totalDailyEnergy: [null, [Validators.required, Validators.min(1)]],
    percentOfProtein: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    percentOfFat: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    percentOfCarbohydrates: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  constructor(protected mealPlanService: MealPlanService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealPlan }) => {
      this.updateForm(mealPlan);
    });
  }

  updateForm(mealPlan: IMealPlan) {
    this.editForm.patchValue({
      id: mealPlan.id,
      authorId: mealPlan.authorId,
      creationDate: mealPlan.creationDate,
      name: mealPlan.name,
      isVisible: mealPlan.isVisible,
      isLocked: mealPlan.isLocked,
      language: mealPlan.language,
      numberOfDays: mealPlan.numberOfDays,
      numberOfMealsPerDay: mealPlan.numberOfMealsPerDay,
      totalDailyEnergy: mealPlan.totalDailyEnergy,
      percentOfProtein: mealPlan.percentOfProtein,
      percentOfFat: mealPlan.percentOfFat,
      percentOfCarbohydrates: mealPlan.percentOfCarbohydrates
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealPlan = this.createFromForm();
    if (mealPlan.id !== undefined) {
      this.subscribeToSaveResponse(this.mealPlanService.update(mealPlan));
    } else {
      this.subscribeToSaveResponse(this.mealPlanService.create(mealPlan));
    }
  }

  private createFromForm(): IMealPlan {
    return {
      ...new MealPlan(),
      id: this.editForm.get(['id']).value,
      authorId: this.editForm.get(['authorId']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      name: this.editForm.get(['name']).value,
      isVisible: this.editForm.get(['isVisible']).value,
      isLocked: this.editForm.get(['isLocked']).value,
      language: this.editForm.get(['language']).value,
      numberOfDays: this.editForm.get(['numberOfDays']).value,
      numberOfMealsPerDay: this.editForm.get(['numberOfMealsPerDay']).value,
      totalDailyEnergy: this.editForm.get(['totalDailyEnergy']).value,
      percentOfProtein: this.editForm.get(['percentOfProtein']).value,
      percentOfFat: this.editForm.get(['percentOfFat']).value,
      percentOfCarbohydrates: this.editForm.get(['percentOfCarbohydrates']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlan>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
