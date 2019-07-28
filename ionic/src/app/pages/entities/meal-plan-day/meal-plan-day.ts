import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealPlanDay } from './meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';

@Component({
    selector: 'page-meal-plan-day',
    templateUrl: 'meal-plan-day.html'
})
export class MealPlanDayPage {
    mealPlanDays: MealPlanDay[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealPlanDayService: MealPlanDayService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealPlanDays = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealPlanDayService.query().pipe(
            filter((res: HttpResponse<MealPlanDay[]>) => res.ok),
            map((res: HttpResponse<MealPlanDay[]>) => res.body)
        )
        .subscribe(
            (response: MealPlanDay[]) => {
                this.mealPlanDays = response;
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

    trackId(index: number, item: MealPlanDay) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-plan-day/new');
    }

    edit(item: IonItemSliding, mealPlanDay: MealPlanDay) {
        this.navController.navigateForward('/tabs/entities/meal-plan-day/' + mealPlanDay.id + '/edit');
        item.close();
    }

    async delete(mealPlanDay) {
        this.mealPlanDayService.delete(mealPlanDay.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealPlanDay deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealPlanDay: MealPlanDay) {
        this.navController.navigateForward('/tabs/entities/meal-plan-day/' + mealPlanDay.id + '/view');
    }
}
