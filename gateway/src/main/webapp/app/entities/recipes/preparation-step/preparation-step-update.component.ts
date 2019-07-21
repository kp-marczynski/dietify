import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPreparationStep, PreparationStep } from 'app/shared/model/recipes/preparation-step.model';
import { PreparationStepService } from './preparation-step.service';
import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { RecipeSectionService } from 'app/entities/recipes/recipe-section';

@Component({
  selector: 'jhi-preparation-step-update',
  templateUrl: './preparation-step-update.component.html'
})
export class PreparationStepUpdateComponent implements OnInit {
  isSaving: boolean;

  recipesections: IRecipeSection[];

  editForm = this.fb.group({
    id: [],
    ordinalNumber: [null, [Validators.required, Validators.min(1)]],
    stepDescription: [],
    recipeSectionId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected preparationStepService: PreparationStepService,
    protected recipeSectionService: RecipeSectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ preparationStep }) => {
      this.updateForm(preparationStep);
    });
    this.recipeSectionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipeSection[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipeSection[]>) => response.body)
      )
      .subscribe((res: IRecipeSection[]) => (this.recipesections = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(preparationStep: IPreparationStep) {
    this.editForm.patchValue({
      id: preparationStep.id,
      ordinalNumber: preparationStep.ordinalNumber,
      stepDescription: preparationStep.stepDescription,
      recipeSectionId: preparationStep.recipeSectionId
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const preparationStep = this.createFromForm();
    if (preparationStep.id !== undefined) {
      this.subscribeToSaveResponse(this.preparationStepService.update(preparationStep));
    } else {
      this.subscribeToSaveResponse(this.preparationStepService.create(preparationStep));
    }
  }

  private createFromForm(): IPreparationStep {
    return {
      ...new PreparationStep(),
      id: this.editForm.get(['id']).value,
      ordinalNumber: this.editForm.get(['ordinalNumber']).value,
      stepDescription: this.editForm.get(['stepDescription']).value,
      recipeSectionId: this.editForm.get(['recipeSectionId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreparationStep>>) {
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

  trackRecipeSectionById(index: number, item: IRecipeSection) {
    return item.id;
  }
}
