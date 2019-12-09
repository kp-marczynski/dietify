import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { INutritionalInterview, NutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { NutritionalInterviewService } from './nutritional-interview.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'app/shared/model/products/product.model';

@Component({
  selector: 'jhi-nutritional-interview-update',
  templateUrl: './nutritional-interview-update.component.html',
  styleUrls: ['./nutritional-interview-update.component.scss']
})
export class NutritionalInterviewUpdateComponent implements OnInit {
  @Output() passEntry: EventEmitter<NutritionalInterview> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  isSaving: boolean;

  completionDateDp: any;
  currentTabIndex = 0;

  editForm = this.fb.group({
    id: [],
    completionDate: [null, [Validators.required]],
    targetWeight: [null, [Validators.required]],
    advicePurpose: [null, [Validators.required]],
    physicalActivity: [null, [Validators.required]],
    diseases: [],
    medicines: [],
    jobType: [],
    likedProducts: [],
    dislikedProducts: [],
    foodAllergies: [],
    foodIntolerances: [],
    customQuestions: this.fb.array([])
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nutritionalInterview }) => {
      if (nutritionalInterview) {
        this.updateForm(nutritionalInterview);
      }
      this.getCustomQuestionsFormArray().push(this.getCustomQuestionsFormGroup());
    });
  }

  updateForm(nutritionalInterview: INutritionalInterview) {
    this.editForm.patchValue({
      id: nutritionalInterview.id,
      completionDate: nutritionalInterview.completionDate,
      targetWeight: nutritionalInterview.targetWeight,
      advicePurpose: nutritionalInterview.advicePurpose,
      physicalActivity: nutritionalInterview.physicalActivity,
      diseases: nutritionalInterview.diseases,
      medicines: nutritionalInterview.medicines,
      jobType: nutritionalInterview.jobType,
      likedProducts: nutritionalInterview.likedProducts,
      dislikedProducts: nutritionalInterview.dislikedProducts,
      foodAllergies: nutritionalInterview.foodAllergies,
      foodIntolerances: nutritionalInterview.foodIntolerances,
      customQuestions: nutritionalInterview.customQuestions
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
    this.cancel.emit(true);
  }

  save() {
    this.isSaving = true;
    const nutritionalInterview = this.createFromForm();
    this.removeEmptyCustomQuestions(nutritionalInterview);
    this.passBack(nutritionalInterview);
  }

  createFromForm(): INutritionalInterview {
    return {
      ...new NutritionalInterview(),
      id: this.editForm.get(['id']).value,
      completionDate: this.editForm.get(['completionDate']).value,
      targetWeight: this.editForm.get(['targetWeight']).value,
      advicePurpose: this.editForm.get(['advicePurpose']).value,
      physicalActivity: this.editForm.get(['physicalActivity']).value,
      diseases: this.editForm.get(['diseases']).value,
      medicines: this.editForm.get(['medicines']).value,
      jobType: this.editForm.get(['jobType']).value,
      likedProducts: this.editForm.get(['likedProducts']).value,
      dislikedProducts: this.editForm.get(['dislikedProducts']).value,
      foodAllergies: this.editForm.get(['foodAllergies']).value,
      foodIntolerances: this.editForm.get(['foodIntolerances']).value,
      customQuestions: this.editForm.get(['customQuestions']).value
    };
  }

  getCustomQuestionsFormArray() {
    return this.editForm.get('customQuestions') as FormArray;
  }

  getCustomQuestionsFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      question: [],
      answer: []
    });
  }

  updateCustomQuestionsList() {
    for (let i = this.getCustomQuestionsFormArray().length - 1; i >= 0; --i) {
      if (
        !this.getCustomQuestionsFormArray().controls[i].get('question').value &&
        !this.getCustomQuestionsFormArray().controls[i].get('answer').value
      ) {
        this.getCustomQuestionsFormArray().removeAt(i);
      }
    }
    this.getCustomQuestionsFormArray().push(this.getCustomQuestionsFormGroup());
  }

  removeCustomQuestion(index: number) {
    this.getCustomQuestionsFormArray().removeAt(index);
  }

  private removeEmptyCustomQuestions(nutritionalInterview: INutritionalInterview) {
    nutritionalInterview.customQuestions = nutritionalInterview.customQuestions.filter(customQuestion => customQuestion.question);
    for (let i = 0; i < nutritionalInterview.customQuestions.length; ++i) {
      nutritionalInterview.customQuestions[i].ordinalNumber = i + 1;
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutritionalInterview>>) {
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

  goToSection(number: number) {
    this.currentTabIndex = number;
  }

  passBack(nutritionalInterview: NutritionalInterview): void {
    this.passEntry.emit(nutritionalInterview);
  }
}
