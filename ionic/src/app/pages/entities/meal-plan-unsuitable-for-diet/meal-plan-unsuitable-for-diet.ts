import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealPlanUnsuitableForDiet } from './meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';

@Component({
    selector: 'page-meal-plan-unsuitable-for-diet',
    templateUrl: 'meal-plan-unsuitable-for-diet.html'
})
export class MealPlanUnsuitableForDietPage {
    mealPlanUnsuitableForDiets: MealPlanUnsuitableForDiet[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealPlanUnsuitableForDiets = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealPlanUnsuitableForDietService.query().pipe(
            filter((res: HttpResponse<MealPlanUnsuitableForDiet[]>) => res.ok),
            map((res: HttpResponse<MealPlanUnsuitableForDiet[]>) => res.body)
        )
        .subscribe(
            (response: MealPlanUnsuitableForDiet[]) => {
                this.mealPlanUnsuitableForDiets = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: MealPlanUnsuitableForDiet) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-plan-unsuitable-for-diet/new');
    }

    edit(item: IonItemSliding, mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/meal-plan-unsuitable-for-diet/' + mealPlanUnsuitableForDiet.id + '/edit');
        item.close();
    }

    async delete(mealPlanUnsuitableForDiet) {
        this.mealPlanUnsuitableForDietService.delete(mealPlanUnsuitableForDiet.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealPlanUnsuitableForDiet deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/meal-plan-unsuitable-for-diet/' + mealPlanUnsuitableForDiet.id + '/view');
    }
}
