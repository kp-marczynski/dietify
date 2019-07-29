import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomNutritionalInterviewQuestion } from './custom-nutritional-interview-question.model';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';
import { NutritionalInterview, NutritionalInterviewService } from '../nutritional-interview';

@Component({
    selector: 'page-custom-nutritional-interview-question-update',
    templateUrl: 'custom-nutritional-interview-question-update.html'
})
export class CustomNutritionalInterviewQuestionUpdatePage implements OnInit {

    customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion;
    nutritionalInterviews: NutritionalInterview[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ordinalNumber: [null, []],
        question: [null, [Validators.required]],
        answer: [null, []],
        nutritionalInterview: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private nutritionalInterviewService: NutritionalInterviewService,
        private customNutritionalInterviewQuestionService: CustomNutritionalInterviewQuestionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.nutritionalInterviewService.query()
            .subscribe(data => { this.nutritionalInterviews = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.customNutritionalInterviewQuestion = response.data;
            this.isNew = this.customNutritionalInterviewQuestion.id === null || this.customNutritionalInterviewQuestion.id === undefined;
        });
    }

    updateForm(customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion) {
        this.form.patchValue({
            id: customNutritionalInterviewQuestion.id,
            ordinalNumber: customNutritionalInterviewQuestion.ordinalNumber,
            question: customNutritionalInterviewQuestion.question,
            answer: customNutritionalInterviewQuestion.answer,
            nutritionalInterview: customNutritionalInterviewQuestion.nutritionalInterview,
        });
    }

    save() {
        this.isSaving = true;
        const customNutritionalInterviewQuestion = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.customNutritionalInterviewQuestionService.update(customNutritionalInterviewQuestion));
        } else {
            this.subscribeToSaveResponse(this.customNutritionalInterviewQuestionService.create(customNutritionalInterviewQuestion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<CustomNutritionalInterviewQuestion>>) {
        result.subscribe((res: HttpResponse<CustomNutritionalInterviewQuestion>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `CustomNutritionalInterviewQuestion ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/custom-nutritional-interview-question');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): CustomNutritionalInterviewQuestion {
        return {
            ...new CustomNutritionalInterviewQuestion(),
            id: this.form.get(['id']).value,
            ordinalNumber: this.form.get(['ordinalNumber']).value,
            question: this.form.get(['question']).value,
            answer: this.form.get(['answer']).value,
            nutritionalInterview: this.form.get(['nutritionalInterview']).value,
        };
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    compareNutritionalInterview(first: NutritionalInterview, second: NutritionalInterview): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackNutritionalInterviewById(index: number, item: NutritionalInterview) {
        return item.id;
    }
}
