import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealPlanUnsuitableForDiet } from './meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';
import { MealPlan, MealPlanService } from '../meal-plan';

@Component({
    selector: 'page-meal-plan-unsuitable-for-diet-update',
    templateUrl: 'meal-plan-unsuitable-for-diet-update.html'
})
export class MealPlanUnsuitableForDietUpdatePage implements OnInit {

    mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet;
    mealPlans: MealPlan[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        dietTypeId: [null, [Validators.required]],
        mealPlan: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealPlanService: MealPlanService,
        private mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService
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
            this.mealPlanUnsuitableForDiet = response.data;
            this.isNew = this.mealPlanUnsuitableForDiet.id === null || this.mealPlanUnsuitableForDiet.id === undefined;
        });
    }

    updateForm(mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet) {
        this.form.patchValue({
            id: mealPlanUnsuitableForDiet.id,
            dietTypeId: mealPlanUnsuitableForDiet.dietTypeId,
            mealPlan: mealPlanUnsuitableForDiet.mealPlan,
        });
    }

    save() {
        this.isSaving = true;
        const mealPlanUnsuitableForDiet = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealPlanUnsuitableForDietService.update(mealPlanUnsuitableForDiet));
        } else {
            this.subscribeToSaveResponse(this.mealPlanUnsuitableForDietService.create(mealPlanUnsuitableForDiet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealPlanUnsuitableForDiet>>) {
        result.subscribe((res: HttpResponse<MealPlanUnsuitableForDiet>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealPlanUnsuitableForDiet ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-plan-unsuitable-for-diet');
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

    private createFromForm(): MealPlanUnsuitableForDiet {
        return {
            ...new MealPlanUnsuitableForDiet(),
            id: this.form.get(['id']).value,
            dietTypeId: this.form.get(['dietTypeId']).value,
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
