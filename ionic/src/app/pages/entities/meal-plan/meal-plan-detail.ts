import { Component, OnInit } from '@angular/core';
import { MealPlan } from './meal-plan.model';
import { MealPlanService } from './meal-plan.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-plan-detail',
    templateUrl: 'meal-plan-detail.html'
})
export class MealPlanDetailPage implements OnInit {
    mealPlan: MealPlan;

    constructor(
        private navController: NavController,
        private mealPlanService: MealPlanService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealPlan = response.data;
        });
    }

    open(item: MealPlan) {
        this.navController.navigateForward('/tabs/entities/meal-plan/' + item.id + '/edit');
    }

    async deleteModal(item: MealPlan) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.mealPlanService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-plan');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
