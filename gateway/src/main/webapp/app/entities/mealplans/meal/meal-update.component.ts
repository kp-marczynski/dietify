import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMeal, Meal } from 'app/shared/model/mealplans/meal.model';
import { MealService } from './meal.service';
import { IMealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';
import { MealPlanDayService } from 'app/entities/mealplans/meal-plan-day';

@Component({
  selector: 'jhi-meal-update',
  templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
  isSaving: boolean;

  mealplandays: IMealPlanDay[];

  editForm = this.fb.group({
    id: [],
    ordinalNumber: [null, [Validators.required, Validators.min(1)]],
    mealPlanDayId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealService: MealService,
    protected mealPlanDayService: MealPlanDayService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ meal }) => {
      this.updateForm(meal);
    });
    this.mealPlanDayService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealPlanDay[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealPlanDay[]>) => response.body)
      )
      .subscribe((res: IMealPlanDay[]) => (this.mealplandays = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(meal: IMeal) {
    this.editForm.patchValue({
      id: meal.id,
      ordinalNumber: meal.ordinalNumber,
      mealPlanDayId: meal.mealPlanDayId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const meal = this.createFromForm();
    if (meal.id !== undefined) {
      this.subscribeToSaveResponse(this.mealService.update(meal));
    } else {
      this.subscribeToSaveResponse(this.mealService.create(meal));
    }
  }

  private createFromForm(): IMeal {
    return {
      ...new Meal(),
      id: this.editForm.get(['id']).value,
      ordinalNumber: this.editForm.get(['ordinalNumber']).value,
      mealPlanDayId: this.editForm.get(['mealPlanDayId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeal>>) {
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

  trackMealPlanDayById(index: number, item: IMealPlanDay) {
    return item.id;
  }
}
