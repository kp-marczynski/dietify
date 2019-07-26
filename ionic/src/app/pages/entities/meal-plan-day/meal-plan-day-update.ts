import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealPlanDay } from './meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';
import { MealPlan, MealPlanService } from '../meal-plan';

@Component({
    selector: 'page-meal-plan-day-update',
    templateUrl: 'meal-plan-day-update.html'
})
export class MealPlanDayUpdatePage implements OnInit {

    mealPlanDay: MealPlanDay;
    mealPlans: MealPlan[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ordinalNumber: [null, [Validators.required]],
        mealPlan: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealPlanService: MealPlanService,
        private mealPlanDayService: MealPlanDayService
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
            this.mealPlanDay = response.data;
            this.isNew = this.mealPlanDay.id === null || this.mealPlanDay.id === undefined;
        });
    }

    updateForm(mealPlanDay: MealPlanDay) {
        this.form.patchValue({
            id: mealPlanDay.id,
            ordinalNumber: mealPlanDay.ordinalNumber,
            mealPlan: mealPlanDay.mealPlan,
        });
    }

    save() {
        this.isSaving = true;
        const mealPlanDay = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealPlanDayService.update(mealPlanDay));
        } else {
            this.subscribeToSaveResponse(this.mealPlanDayService.create(mealPlanDay));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MealPlanDay>>) {
        result.subscribe((res: HttpResponse<MealPlanDay>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MealPlanDay ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal-plan-day');
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

    private createFromForm(): MealPlanDay {
        return {
            ...new MealPlanDay(),
            id: this.form.get(['id']).value,
            ordinalNumber: this.form.get(['ordinalNumber']).value,
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
