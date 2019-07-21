import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import {
  ICustomNutritionalInterviewQuestion,
  CustomNutritionalInterviewQuestion
} from 'app/shared/model/appointments/custom-nutritional-interview-question.model';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';
import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-update',
  templateUrl: './custom-nutritional-interview-question-update.component.html'
})
export class CustomNutritionalInterviewQuestionUpdateComponent implements OnInit {
  isSaving: boolean;

  nutritionalinterviews: INutritionalInterview[];

  editForm = this.fb.group({
    id: [],
    ordinalNumber: [null, [Validators.min(1)]],
    question: [null, [Validators.required]],
    answer: [],
    nutritionalInterviewId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected customNutritionalInterviewQuestionService: CustomNutritionalInterviewQuestionService,
    protected nutritionalInterviewService: NutritionalInterviewService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ customNutritionalInterviewQuestion }) => {
      this.updateForm(customNutritionalInterviewQuestion);
    });
    this.nutritionalInterviewService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INutritionalInterview[]>) => mayBeOk.ok),
        map((response: HttpResponse<INutritionalInterview[]>) => response.body)
      )
      .subscribe(
        (res: INutritionalInterview[]) => (this.nutritionalinterviews = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(customNutritionalInterviewQuestion: ICustomNutritionalInterviewQuestion) {
    this.editForm.patchValue({
      id: customNutritionalInterviewQuestion.id,
      ordinalNumber: customNutritionalInterviewQuestion.ordinalNumber,
      question: customNutritionalInterviewQuestion.question,
      answer: customNutritionalInterviewQuestion.answer,
      nutritionalInterviewId: customNutritionalInterviewQuestion.nutritionalInterviewId
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
    const customNutritionalInterviewQuestion = this.createFromForm();
    if (customNutritionalInterviewQuestion.id !== undefined) {
      this.subscribeToSaveResponse(this.customNutritionalInterviewQuestionService.update(customNutritionalInterviewQuestion));
    } else {
      this.subscribeToSaveResponse(this.customNutritionalInterviewQuestionService.create(customNutritionalInterviewQuestion));
    }
  }

  private createFromForm(): ICustomNutritionalInterviewQuestion {
    return {
      ...new CustomNutritionalInterviewQuestion(),
      id: this.editForm.get(['id']).value,
      ordinalNumber: this.editForm.get(['ordinalNumber']).value,
      question: this.editForm.get(['question']).value,
      answer: this.editForm.get(['answer']).value,
      nutritionalInterviewId: this.editForm.get(['nutritionalInterviewId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomNutritionalInterviewQuestion>>) {
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

  trackNutritionalInterviewById(index: number, item: INutritionalInterview) {
    return item.id;
  }
}
