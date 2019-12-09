import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMealType, MealType } from 'app/shared/model/recipes/meal-type.model';
import { MealTypeService } from './meal-type.service';

@Component({
  selector: 'jhi-meal-type-update',
  templateUrl: './meal-type-update.component.html'
})
export class MealTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
  });

  constructor(protected mealTypeService: MealTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealType }) => {
      this.updateForm(mealType);
    });
  }

  updateForm(mealType: IMealType) {
    this.editForm.patchValue({
      id: mealType.id,
      name: mealType.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealType = this.createFromForm();
    if (mealType.id !== undefined) {
      this.subscribeToSaveResponse(this.mealTypeService.update(mealType));
    } else {
      this.subscribeToSaveResponse(this.mealTypeService.create(mealType));
    }
  }

  private createFromForm(): IMealType {
    return {
      ...new MealType(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealType>>) {
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
