import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INutritionDefinition, NutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';

@Component({
  selector: 'jhi-nutrition-definition-update',
  templateUrl: './nutrition-definition-update.component.html'
})
export class NutritionDefinitionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    tag: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    units: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    decimalPlaces: [null, [Validators.required, Validators.min(0)]]
  });

  constructor(
    protected nutritionDefinitionService: NutritionDefinitionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nutritionDefinition }) => {
      this.updateForm(nutritionDefinition);
    });
  }

  updateForm(nutritionDefinition: INutritionDefinition) {
    this.editForm.patchValue({
      id: nutritionDefinition.id,
      tag: nutritionDefinition.tag,
      description: nutritionDefinition.description,
      units: nutritionDefinition.units,
      decimalPlaces: nutritionDefinition.decimalPlaces
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const nutritionDefinition = this.createFromForm();
    if (nutritionDefinition.id !== undefined) {
      this.subscribeToSaveResponse(this.nutritionDefinitionService.update(nutritionDefinition));
    } else {
      this.subscribeToSaveResponse(this.nutritionDefinitionService.create(nutritionDefinition));
    }
  }

  private createFromForm(): INutritionDefinition {
    return {
      ...new NutritionDefinition(),
      id: this.editForm.get(['id']).value,
      tag: this.editForm.get(['tag']).value,
      description: this.editForm.get(['description']).value,
      units: this.editForm.get(['units']).value,
      decimalPlaces: this.editForm.get(['decimalPlaces']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutritionDefinition>>) {
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
