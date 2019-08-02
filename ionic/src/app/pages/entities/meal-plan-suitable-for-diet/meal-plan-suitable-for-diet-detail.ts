import { Component, OnInit } from '@angular/core';
import { MealPlanSuitableForDiet } from './meal-plan-suitable-for-diet.model';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-plan-suitable-for-diet-detail',
    templateUrl: 'meal-plan-suitable-for-diet-detail.html'
})
export class MealPlanSuitableForDietDetailPage implements OnInit {
    mealPlanSuitableForDiet: MealPlanSuitableForDiet;

    constructor(
        private navController: NavController,
        private mealPlanSuitableForDietService: MealPlanSuitableForDietService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealPlanSuitableForDiet = response.data;
        });
    }

    open(item: MealPlanSuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/meal-plan-suitable-for-diet/' + item.id + '/edit');
    }

    async deleteModal(item: MealPlanSuitableForDiet) {
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
                        this.mealPlanSuitableForDietService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-plan-suitable-for-diet');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
