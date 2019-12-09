import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealPlanDay, MealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from 'app/entities/mealplans/meal-plan';

@Component({
  selector: 'jhi-meal-plan-day-update',
  templateUrl: './meal-plan-day-update.component.html'
})
export class MealPlanDayUpdateComponent implements OnInit {
  isSaving: boolean;

  mealplans: IMealPlan[];

  editForm = this.fb.group({
    id: [],
    ordinalNumber: [null, [Validators.required, Validators.min(1)]],
    mealPlan: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealPlanDayService: MealPlanDayService,
    protected mealPlanService: MealPlanService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealPlanDay }) => {
      this.updateForm(mealPlanDay);
    });
    this.mealPlanService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealPlan[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealPlan[]>) => response.body)
      )
      .subscribe((res: IMealPlan[]) => (this.mealplans = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealPlanDay: IMealPlanDay) {
    this.editForm.patchValue({
      id: mealPlanDay.id,
      ordinalNumber: mealPlanDay.ordinalNumber,
      mealPlan: mealPlanDay.mealPlan
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealPlanDay = this.createFromForm();
    if (mealPlanDay.id !== undefined) {
      this.subscribeToSaveResponse(this.mealPlanDayService.update(mealPlanDay));
    } else {
      this.subscribeToSaveResponse(this.mealPlanDayService.create(mealPlanDay));
    }
  }

  private createFromForm(): IMealPlanDay {
    return {
      ...new MealPlanDay(),
      id: this.editForm.get(['id']).value,
      ordinalNumber: this.editForm.get(['ordinalNumber']).value,
      mealPlan: this.editForm.get(['mealPlan']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlanDay>>) {
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
