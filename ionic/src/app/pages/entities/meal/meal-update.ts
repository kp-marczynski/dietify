import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Meal } from './meal.model';
import { MealService } from './meal.service';
import { MealPlanDay, MealPlanDayService } from '../meal-plan-day';

@Component({
    selector: 'page-meal-update',
    templateUrl: 'meal-update.html'
})
export class MealUpdatePage implements OnInit {

    meal: Meal;
    mealPlanDays: MealPlanDay[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ordinalNumber: [null, [Validators.required]],
        mealPlanDay: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private mealPlanDayService: MealPlanDayService,
        private mealService: MealService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.mealPlanDayService.query()
            .subscribe(data => { this.mealPlanDays = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.meal = response.data;
            this.isNew = this.meal.id === null || this.meal.id === undefined;
        });
    }

    updateForm(meal: Meal) {
        this.form.patchValue({
            id: meal.id,
            ordinalNumber: meal.ordinalNumber,
            mealPlanDay: meal.mealPlanDay,
        });
    }

    save() {
        this.isSaving = true;
        const meal = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.mealService.update(meal));
        } else {
            this.subscribeToSaveResponse(this.mealService.create(meal));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Meal>>) {
        result.subscribe((res: HttpResponse<Meal>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Meal ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/meal');
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

    private createFromForm(): Meal {
        return {
            ...new Meal(),
            id: this.form.get(['id']).value,
            ordinalNumber: this.form.get(['ordinalNumber']).value,
            mealPlanDay: this.form.get(['mealPlanDay']).value,
        };
    }

    compareMealPlanDay(first: MealPlanDay, second: MealPlanDay): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackMealPlanDayById(index: number, item: MealPlanDay) {
        return item.id;
    }
}
