import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDishTypeTranslation, DishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';
import { DishTypeTranslationService } from './dish-type-translation.service';
import { IDishType } from 'app/shared/model/recipes/dish-type.model';
import { DishTypeService } from 'app/entities/recipes/dish-type';

@Component({
  selector: 'jhi-dish-type-translation-update',
  templateUrl: './dish-type-translation-update.component.html'
})
export class DishTypeTranslationUpdateComponent implements OnInit {
  isSaving: boolean;

  dishtypes: IDishType[];

  editForm = this.fb.group({
    id: [],
    translation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    dishType: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dishTypeTranslationService: DishTypeTranslationService,
    protected dishTypeService: DishTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dishTypeTranslation }) => {
      this.updateForm(dishTypeTranslation);
    });
    this.dishTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDishType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDishType[]>) => response.body)
      )
      .subscribe((res: IDishType[]) => (this.dishtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(dishTypeTranslation: IDishTypeTranslation) {
    this.editForm.patchValue({
      id: dishTypeTranslation.id,
      translation: dishTypeTranslation.translation,
      language: dishTypeTranslation.language,
      dishType: dishTypeTranslation.dishType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dishTypeTranslation = this.createFromForm();
    if (dishTypeTranslation.id !== undefined) {
      this.subscribeToSaveResponse(this.dishTypeTranslationService.update(dishTypeTranslation));
    } else {
      this.subscribeToSaveResponse(this.dishTypeTranslationService.create(dishTypeTranslation));
    }
  }

  private createFromForm(): IDishTypeTranslation {
    return {
      ...new DishTypeTranslation(),
      id: this.editForm.get(['id']).value,
      translation: this.editForm.get(['translation']).value,
      language: this.editForm.get(['language']).value,
      dishType: this.editForm.get(['dishType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDishTypeTranslation>>) {
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

  trackDishTypeById(index: number, item: IDishType) {
    return item.id;
  }
}
