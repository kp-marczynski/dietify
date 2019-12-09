import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMealTypeTranslation, MealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';
import { MealTypeTranslationService } from './meal-type-translation.service';
import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { MealTypeService } from 'app/entities/recipes/meal-type';

@Component({
  selector: 'jhi-meal-type-translation-update',
  templateUrl: './meal-type-translation-update.component.html'
})
export class MealTypeTranslationUpdateComponent implements OnInit {
  isSaving: boolean;

  mealtypes: IMealType[];

  editForm = this.fb.group({
    id: [],
    translation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    mealType: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealTypeTranslationService: MealTypeTranslationService,
    protected mealTypeService: MealTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealTypeTranslation }) => {
      this.updateForm(mealTypeTranslation);
    });
    this.mealTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealType[]>) => response.body)
      )
      .subscribe((res: IMealType[]) => (this.mealtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealTypeTranslation: IMealTypeTranslation) {
    this.editForm.patchValue({
      id: mealTypeTranslation.id,
      translation: mealTypeTranslation.translation,
      language: mealTypeTranslation.language,
      mealType: mealTypeTranslation.mealType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealTypeTranslation = this.createFromForm();
    if (mealTypeTranslation.id !== undefined) {
      this.subscribeToSaveResponse(this.mealTypeTranslationService.update(mealTypeTranslation));
    } else {
      this.subscribeToSaveResponse(this.mealTypeTranslationService.create(mealTypeTranslation));
    }
  }

  private createFromForm(): IMealTypeTranslation {
    return {
      ...new MealTypeTranslation(),
      id: this.editForm.get(['id']).value,
      translation: this.editForm.get(['translation']).value,
      language: this.editForm.get(['language']).value,
      mealType: this.editForm.get(['mealType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealTypeTranslation>>) {
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

  trackMealTypeById(index: number, item: IMealType) {
    return item.id;
  }
}
