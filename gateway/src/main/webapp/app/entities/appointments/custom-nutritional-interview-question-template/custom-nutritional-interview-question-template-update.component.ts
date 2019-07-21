import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import {
  ICustomNutritionalInterviewQuestionTemplate,
  CustomNutritionalInterviewQuestionTemplate
} from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-template-update',
  templateUrl: './custom-nutritional-interview-question-template-update.component.html'
})
export class CustomNutritionalInterviewQuestionTemplateUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    ownerId: [null, [Validators.required]],
    question: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected customNutritionalInterviewQuestionTemplateService: CustomNutritionalInterviewQuestionTemplateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ customNutritionalInterviewQuestionTemplate }) => {
      this.updateForm(customNutritionalInterviewQuestionTemplate);
    });
  }

  updateForm(customNutritionalInterviewQuestionTemplate: ICustomNutritionalInterviewQuestionTemplate) {
    this.editForm.patchValue({
      id: customNutritionalInterviewQuestionTemplate.id,
      ownerId: customNutritionalInterviewQuestionTemplate.ownerId,
      question: customNutritionalInterviewQuestionTemplate.question,
      language: customNutritionalInterviewQuestionTemplate.language
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
    const customNutritionalInterviewQuestionTemplate = this.createFromForm();
    if (customNutritionalInterviewQuestionTemplate.id !== undefined) {
      this.subscribeToSaveResponse(
        this.customNutritionalInterviewQuestionTemplateService.update(customNutritionalInterviewQuestionTemplate)
      );
    } else {
      this.subscribeToSaveResponse(
        this.customNutritionalInterviewQuestionTemplateService.create(customNutritionalInterviewQuestionTemplate)
      );
    }
  }

  private createFromForm(): ICustomNutritionalInterviewQuestionTemplate {
    return {
      ...new CustomNutritionalInterviewQuestionTemplate(),
      id: this.editForm.get(['id']).value,
      ownerId: this.editForm.get(['ownerId']).value,
      question: this.editForm.get(['question']).value,
      language: this.editForm.get(['language']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomNutritionalInterviewQuestionTemplate>>) {
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
}
