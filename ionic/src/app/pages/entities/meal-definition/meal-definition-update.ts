import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealDefinition } from './meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';
import { MealPlan, MealPlanService } from '../meal-plan';

@Component({
    selector: 'page-meal-definition-update',
    templateUrl: 'meal-definition-update.html'
})
export class MealDefinitionUpdatePage implements OnInit {

    mealDefinition: MealDefinition;
    mealPlans: MealPlan[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ordinalNumber: [null, [Validators.required]],
        mealTypeId: [null, [Validators.required]],
        timeOfMeal: [null, [Validators.required]],
        percentOfEnergy: [null, [Validators.required]],
        mealPlan: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealPlanService: MealPlanService,
        private mealDefinitionService: MealDefinitionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.mealPlanService.query()
            .subscribe(data => { this.mealPlans = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.mealDefinition = response.data;
            this.isNew = this.mealDefinition.id === null || this.mealDefinition.id === undefined;
        });
    }

    updateForm(mealDefinition: MealDefinition) {
        this.form.patchValue({
            id: mealDefinition.id,
            ordinalNumber: mealDefinition.ordinalNumber,
            mealTypeId: mealDefinition.mealTypeId,
            timeOfMeal: mealDefinition.timeOfMeal,
            percentOfEnergy: mealDefinition.percentOfEnergy,
            mealPlan: mealDefinition.mealPlan,
        });
    }

    save() {
        this.isSaving = true;
        const mealDefinition = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealDefinitionService.update(mealDefinition));
        } else {
            this.subscribeToSaveResponse(this.mealDefinitionService.create(mealDefinition));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealDefinition>>) {
        result.subscribe((res: HttpResponse<MealDefinition>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealDefinition ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-definition');
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

    private createFromForm(): MealDefinition {
        return {
            ...new MealDefinition(),
            id: this.form.get(['id']).value,
            ordinalNumber: this.form.get(['ordinalNumber']).value,
            mealTypeId: this.form.get(['mealTypeId']).value,
            timeOfMeal: this.form.get(['timeOfMeal']).value,
            percentOfEnergy: this.form.get(['percentOfEnergy']).value,
            mealPlan: this.form.get(['mealPlan']).value,
        };
    }

    compareMealPlan(first: MealPlan, second: MealPlan): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackMealPlanById(index: number, item: MealPlan) {
        return item.id;
    }
}
