import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import {
  INutritionDefinitionTranslation,
  NutritionDefinitionTranslation
} from 'app/shared/model/products/nutrition-definition-translation.model';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { NutritionDefinitionService } from 'app/entities/products/nutrition-definition';

@Component({
  selector: 'jhi-nutrition-definition-translation-update',
  templateUrl: './nutrition-definition-translation-update.component.html'
})
export class NutritionDefinitionTranslationUpdateComponent implements OnInit {
  isSaving: boolean;

  nutritiondefinitions: INutritionDefinition[];

  editForm = this.fb.group({
    id: [],
    translation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    nutritionDefinitionsId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected nutritionDefinitionTranslationService: NutritionDefinitionTranslationService,
    protected nutritionDefinitionService: NutritionDefinitionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nutritionDefinitionTranslation }) => {
      this.updateForm(nutritionDefinitionTranslation);
    });
    this.nutritionDefinitionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INutritionDefinition[]>) => mayBeOk.ok),
        map((response: HttpResponse<INutritionDefinition[]>) => response.body)
      )
      .subscribe((res: INutritionDefinition[]) => (this.nutritiondefinitions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(nutritionDefinitionTranslation: INutritionDefinitionTranslation) {
    this.editForm.patchValue({
      id: nutritionDefinitionTranslation.id,
      translation: nutritionDefinitionTranslation.translation,
      language: nutritionDefinitionTranslation.language,
      nutritionDefinitionsId: nutritionDefinitionTranslation.nutritionDefinitionsId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const nutritionDefinitionTranslation = this.createFromForm();
    if (nutritionDefinitionTranslation.id !== undefined) {
      this.subscribeToSaveResponse(this.nutritionDefinitionTranslationService.update(nutritionDefinitionTranslation));
    } else {
      this.subscribeToSaveResponse(this.nutritionDefinitionTranslationService.create(nutritionDefinitionTranslation));
    }
  }

  private createFromForm(): INutritionDefinitionTranslation {
    return {
      ...new NutritionDefinitionTranslation(),
      id: this.editForm.get(['id']).value,
      translation: this.editForm.get(['translation']).value,
      language: this.editForm.get(['language']).value,
      nutritionDefinitionsId: this.editForm.get(['nutritionDefinitionsId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutritionDefinitionTranslation>>) {
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

  trackNutritionDefinitionById(index: number, item: INutritionDefinition) {
    return item.id;
  }
}
