import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PreparationStep } from './preparation-step.model';
import { PreparationStepService } from './preparation-step.service';
import { RecipeSection, RecipeSectionService } from '../recipe-section';

@Component({
    selector: 'page-preparation-step-update',
    templateUrl: 'preparation-step-update.html'
})
export class PreparationStepUpdatePage implements OnInit {

    preparationStep: PreparationStep;
    recipeSections: RecipeSection[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ordinalNumber: [null, [Validators.required]],
        stepDescription: [null, []],
        recipeSection: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private recipeSectionService: RecipeSectionService,
        private preparationStepService: PreparationStepService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.recipeSectionService.query()
            .subscribe(data => { this.recipeSections = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.preparationStep = response.data;
            this.isNew = this.preparationStep.id === null || this.preparationStep.id === undefined;
        });
    }

    updateForm(preparationStep: PreparationStep) {
        this.form.patchValue({
            id: preparationStep.id,
            ordinalNumber: preparationStep.ordinalNumber,
            stepDescription: preparationStep.stepDescription,
            recipeSection: preparationStep.recipeSection,
        });
    }

    save() {
        this.isSaving = true;
        const preparationStep = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.preparationStepService.update(preparationStep));
        } else {
            this.subscribeToSaveResponse(this.preparationStepService.create(preparationStep));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<PreparationStep>>) {
        result.subscribe((res: HttpResponse<PreparationStep>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `PreparationStep ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/preparation-step');
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

    private createFromForm(): PreparationStep {
        return {
            ...new PreparationStep(),
            id: this.form.get(['id']).value,
            ordinalNumber: this.form.get(['ordinalNumber']).value,
            stepDescription: this.form.get(['stepDescription']).value,
            recipeSection: this.form.get(['recipeSection']).value,
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

    compareRecipeSection(first: RecipeSection, second: RecipeSection): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRecipeSectionById(index: number, item: RecipeSection) {
        return item.id;
    }
}
