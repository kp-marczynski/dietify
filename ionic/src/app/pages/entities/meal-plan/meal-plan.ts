import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealPlan } from './meal-plan.model';
import { MealPlanService } from './meal-plan.service';

@Component({
    selector: 'page-meal-plan',
    templateUrl: 'meal-plan.html'
})
export class MealPlanPage {
    mealPlans: MealPlan[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealPlanService: MealPlanService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealPlans = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealPlanService.query().pipe(
            filter((res: HttpResponse<MealPlan[]>) => res.ok),
            map((res: HttpResponse<MealPlan[]>) => res.body)
        )
        .subscribe(
            (response: MealPlan[]) => {
                this.mealPlans = response;
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

    trackId(index: number, item: MealPlan) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-plan/new');
    }

    edit(item: IonItemSliding, mealPlan: MealPlan) {
        this.navController.navigateForward('/tabs/entities/meal-plan/' + mealPlan.id + '/edit');
        item.close();
    }

    async delete(mealPlan) {
        this.mealPlanService.delete(mealPlan.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealPlan deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealPlan: MealPlan) {
        this.navController.navigateForward('/tabs/entities/meal-plan/' + mealPlan.id + '/view');
    }
}
