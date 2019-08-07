import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealPlan } from './meal-plan.model';
import { MealPlanService } from './meal-plan.service';

@Component({
    selector: 'page-meal-plan-update',
    templateUrl: 'meal-plan-update.html'
})
export class MealPlanUpdatePage implements OnInit {

    mealPlan: MealPlan;
    creationDateDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        authorId: [null, [Validators.required]],
        creationDate: [null, [Validators.required]],
        name: [null, []],
        isVisible: ['false', [Validators.required]],
        isLocked: ['false', [Validators.required]],
        language: [null, [Validators.required]],
        numberOfDays: [null, [Validators.required]],
        numberOfMealsPerDay: [null, [Validators.required]],
        totalDailyEnergy: [null, [Validators.required]],
        percentOfProtein: [null, [Validators.required]],
        percentOfFat: [null, [Validators.required]],
        percentOfCarbohydrates: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealPlanService: MealPlanService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.mealPlan = response.data;
            this.isNew = this.mealPlan.id === null || this.mealPlan.id === undefined;
        });
    }

    updateForm(mealPlan: MealPlan) {
        this.form.patchValue({
            id: mealPlan.id,
            authorId: mealPlan.authorId,
            creationDate: mealPlan.creationDate,
            name: mealPlan.name,
            isVisible: mealPlan.isVisible,
            isLocked: mealPlan.isLocked,
            language: mealPlan.language,
            numberOfDays: mealPlan.numberOfDays,
            numberOfMealsPerDay: mealPlan.numberOfMealsPerDay,
            totalDailyEnergy: mealPlan.totalDailyEnergy,
            percentOfProtein: mealPlan.percentOfProtein,
            percentOfFat: mealPlan.percentOfFat,
            percentOfCarbohydrates: mealPlan.percentOfCarbohydrates,
        });
    }

    save() {
        this.isSaving = true;
        const mealPlan = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealPlanService.update(mealPlan));
        } else {
            this.subscribeToSaveResponse(this.mealPlanService.create(mealPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealPlan>>) {
        result.subscribe((res: HttpResponse<MealPlan>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealPlan ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-plan');
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

    private createFromForm(): MealPlan {
        return {
            ...new MealPlan(),
            id: this.form.get(['id']).value,
            authorId: this.form.get(['authorId']).value,
            creationDate: this.form.get(['creationDate']).value,
            name: this.form.get(['name']).value,
            isVisible: this.form.get(['isVisible']).value,
            isLocked: this.form.get(['isLocked']).value,
            language: this.form.get(['language']).value,
            numberOfDays: this.form.get(['numberOfDays']).value,
            numberOfMealsPerDay: this.form.get(['numberOfMealsPerDay']).value,
            totalDailyEnergy: this.form.get(['totalDailyEnergy']).value,
            percentOfProtein: this.form.get(['percentOfProtein']).value,
            percentOfFat: this.form.get(['percentOfFat']).value,
            percentOfCarbohydrates: this.form.get(['percentOfCarbohydrates']).value,
        };
    }

}
