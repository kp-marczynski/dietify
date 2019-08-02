import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { AssignedMealPlan } from './assigned-meal-plan.model';
import { AssignedMealPlanService } from './assigned-meal-plan.service';

@Component({
    selector: 'page-assigned-meal-plan',
    templateUrl: 'assigned-meal-plan.html'
})
export class AssignedMealPlanPage {
    assignedMealPlans: AssignedMealPlan[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private assignedMealPlanService: AssignedMealPlanService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.assignedMealPlans = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.assignedMealPlanService.query().pipe(
            filter((res: HttpResponse<AssignedMealPlan[]>) => res.ok),
            map((res: HttpResponse<AssignedMealPlan[]>) => res.body)
        )
        .subscribe(
            (response: AssignedMealPlan[]) => {
                this.assignedMealPlans = response;
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

    trackId(index: number, item: AssignedMealPlan) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/assigned-meal-plan/new');
    }

    edit(item: IonItemSliding, assignedMealPlan: AssignedMealPlan) {
        this.navController.navigateForward('/tabs/entities/assigned-meal-plan/' + assignedMealPlan.id + '/edit');
        item.close();
    }

    async delete(assignedMealPlan) {
        this.assignedMealPlanService.delete(assignedMealPlan.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'AssignedMealPlan deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(assignedMealPlan: AssignedMealPlan) {
        this.navController.navigateForward('/tabs/entities/assigned-meal-plan/' + assignedMealPlan.id + '/view');
    }
}
