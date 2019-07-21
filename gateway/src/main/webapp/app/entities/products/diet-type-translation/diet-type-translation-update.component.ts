import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDietTypeTranslation, DietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';
import { DietTypeTranslationService } from './diet-type-translation.service';
import { IDietType } from 'app/shared/model/products/diet-type.model';
import { DietTypeService } from 'app/entities/products/diet-type';

@Component({
  selector: 'jhi-diet-type-translation-update',
  templateUrl: './diet-type-translation-update.component.html'
})
export class DietTypeTranslationUpdateComponent implements OnInit {
  isSaving: boolean;

  diettypes: IDietType[];

  editForm = this.fb.group({
    id: [],
    translation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    dietTypeId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dietTypeTranslationService: DietTypeTranslationService,
    protected dietTypeService: DietTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dietTypeTranslation }) => {
      this.updateForm(dietTypeTranslation);
    });
    this.dietTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDietType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDietType[]>) => response.body)
      )
      .subscribe((res: IDietType[]) => (this.diettypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(dietTypeTranslation: IDietTypeTranslation) {
    this.editForm.patchValue({
      id: dietTypeTranslation.id,
      translation: dietTypeTranslation.translation,
      language: dietTypeTranslation.language,
      dietTypeId: dietTypeTranslation.dietTypeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dietTypeTranslation = this.createFromForm();
    if (dietTypeTranslation.id !== undefined) {
      this.subscribeToSaveResponse(this.dietTypeTranslationService.update(dietTypeTranslation));
    } else {
      this.subscribeToSaveResponse(this.dietTypeTranslationService.create(dietTypeTranslation));
    }
  }

  private createFromForm(): IDietTypeTranslation {
    return {
      ...new DietTypeTranslation(),
      id: this.editForm.get(['id']).value,
      translation: this.editForm.get(['translation']).value,
      language: this.editForm.get(['language']).value,
      dietTypeId: this.editForm.get(['dietTypeId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDietTypeTranslation>>) {
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

  trackDietTypeById(index: number, item: IDietType) {
    return item.id;
  }
}
