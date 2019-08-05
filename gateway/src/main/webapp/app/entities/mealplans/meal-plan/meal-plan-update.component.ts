import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
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
    percentOfCarbohydrates: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    mealDefinitions: this.fb.array([]),
    days: this.fb.array([])
  });

  constructor(protected mealPlanService: MealPlanService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealPlan }) => {
      this.updateForm(mealPlan);
    });

    this.editForm.get('numberOfMealsPerDay').valueChanges.subscribe(numberOfMeals => this.numberOfMealsPerDayChanged());
    this.editForm.get('numberOfDays').valueChanges.subscribe(numberOfDays => this.numberOfDaysChanged());
  }

  getMealDefinitionsFormArray() {
    return this.editForm.get('mealDefinitions') as FormArray;
  }

  getMealDefinitionsFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      mealTypeId: [],
      timeOfMeal: [null, [Validators.required, Validators.pattern('d{2}:d{2}')]],
      percentOfEnergy: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  getDaysFormArray() {
    return this.editForm.get('days') as FormArray;
  }

  getDaysFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      meals: this.fb.array([])
    });
  }

  getMealsFormArray(day: FormGroup) {
    return day.get('meals') as FormArray;
  }

  getMealsFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      recipes: this.fb.array([]),
      products: this.fb.array([])
    });
  }

  getMealRecipesFormArray(meal: FormGroup) {
    return meal.get('recipes') as FormArray;
  }

  getMealRecipesFormGroup() {
    return this.fb.group({
      id: [],
      recipeId: [null, [Validators.required]],
      recipe: [],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  getMealProductsFormArray(meal: FormGroup) {
    return meal.get('products') as FormArray;
  }

  getMealProductsFormGroup() {
    return this.fb.group({
      id: [],
      productId: [null, [Validators.required]],
      product: [],
      householdMeasureId: [],
      amount: [null, [Validators.required, Validators.min(0)]]
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

  numberOfDaysChanged() {
    const daysFormArray = this.getDaysFormArray();
    const numberOfDays = this.editForm.get('numberOfDays').value;
    if (numberOfDays && numberOfDays > 0) {
      if (numberOfDays !== daysFormArray.controls.length) {
        for (let i = daysFormArray.controls.length - 1; i >= numberOfDays; --i) {
          daysFormArray.removeAt(i);
        }
        for (let i = daysFormArray.controls.length; i < numberOfDays; ++i) {
          const daysFormGroup = this.getDaysFormGroup();
          daysFormGroup.patchValue({ ordinalNumber: i + 1 });
          daysFormArray.push(daysFormGroup);
        }
        this.numberOfMealsPerDayChanged();
      }
    }
  }

  numberOfMealsPerDayChanged() {
    const numberOfMeals = this.editForm.get('numberOfMealsPerDay').value;
    const mealDefinitionsFormArray = this.getMealDefinitionsFormArray();
    if (numberOfMeals && numberOfMeals > 0) {
      if (mealDefinitionsFormArray.controls.length !== numberOfMeals) {
        for (let i = mealDefinitionsFormArray.controls.length - 1; i >= numberOfMeals; --i) {
          mealDefinitionsFormArray.removeAt(i);
        }
        for (let i = mealDefinitionsFormArray.controls.length; i < numberOfMeals; ++i) {
          const mealDefinitionsFormGroup = this.getMealDefinitionsFormGroup();
          mealDefinitionsFormGroup.patchValue({ ordinalNumber: i + 1 });
          mealDefinitionsFormArray.push(mealDefinitionsFormGroup);
        }
        console.log(mealDefinitionsFormArray);
      }

      if (this.editForm.get('numberOfDays').value) {
        if (this.getDaysFormArray().controls.length !== this.editForm.get('numberOfDays').value) {
          this.numberOfDaysChanged();
        } else {
          for (const day of this.getDaysFormArray().controls) {
            const mealsFormArray = this.getMealsFormArray(day as FormGroup);
            if (mealsFormArray.controls.length !== numberOfMeals) {
              for (let i = mealsFormArray.controls.length - 1; i >= numberOfMeals; --i) {
                mealsFormArray.removeAt(i);
              }
              for (let i = mealsFormArray.controls.length; i < numberOfMeals; ++i) {
                const mealsFormGroup = this.getMealsFormGroup();
                mealsFormGroup.patchValue({ ordinalNumber: i + 1 });
                mealsFormArray.push(mealsFormGroup);
              }
            }
          }
        }
      }
    }
    console.log(this.editForm);
  }
}
