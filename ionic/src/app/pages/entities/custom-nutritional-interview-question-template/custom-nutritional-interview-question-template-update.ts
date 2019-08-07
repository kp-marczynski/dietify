import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomNutritionalInterviewQuestionTemplate } from './custom-nutritional-interview-question-template.model';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';

@Component({
    selector: 'page-custom-nutritional-interview-question-template-update',
    templateUrl: 'custom-nutritional-interview-question-template-update.html'
})
export class CustomNutritionalInterviewQuestionTemplateUpdatePage implements OnInit {

    customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ownerId: [null, [Validators.required]],
        question: [null, [Validators.required]],
        language: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private customNutritionalInterviewQuestionTemplateService: CustomNutritionalInterviewQuestionTemplateService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.customNutritionalInterviewQuestionTemplate = response.data;
            this.isNew = this.customNutritionalInterviewQuestionTemplate.id === null || this.customNutritionalInterviewQuestionTemplate.id === undefined;
        });
    }

    updateForm(customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate) {
        this.form.patchValue({
            id: customNutritionalInterviewQuestionTemplate.id,
            ownerId: customNutritionalInterviewQuestionTemplate.ownerId,
            question: customNutritionalInterviewQuestionTemplate.question,
            language: customNutritionalInterviewQuestionTemplate.language,
        });
    }

    save() {
        this.isSaving = true;
        const customNutritionalInterviewQuestionTemplate = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.customNutritionalInterviewQuestionTemplateService.update(customNutritionalInterviewQuestionTemplate));
        } else {
            this.subscribeToSaveResponse(this.customNutritionalInterviewQuestionTemplateService.create(customNutritionalInterviewQuestionTemplate));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<CustomNutritionalInterviewQuestionTemplate>>) {
        result.subscribe((res: HttpResponse<CustomNutritionalInterviewQuestionTemplate>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `CustomNutritionalInterviewQuestionTemplate ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/custom-nutritional-interview-question-template');
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

    private createFromForm(): CustomNutritionalInterviewQuestionTemplate {
        return {
            ...new CustomNutritionalInterviewQuestionTemplate(),
            id: this.form.get(['id']).value,
            ownerId: this.form.get(['ownerId']).value,
            question: this.form.get(['question']).value,
            language: this.form.get(['language']).value,
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

}
