import { Component, OnInit } from '@angular/core';
import { MealPlanDay } from './meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-plan-day-detail',
    templateUrl: 'meal-plan-day-detail.html'
})
export class MealPlanDayDetailPage implements OnInit {
    mealPlanDay: MealPlanDay;

    constructor(
        private navController: NavController,
        private mealPlanDayService: MealPlanDayService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealPlanDay = response.data;
        });
    }

    open(item: MealPlanDay) {
        this.navController.navigateForward('/tabs/entities/meal-plan-day/' + item.id + '/edit');
    }

    async deleteModal(item: MealPlanDay) {
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
                        this.mealPlanDayService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-plan-day');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
