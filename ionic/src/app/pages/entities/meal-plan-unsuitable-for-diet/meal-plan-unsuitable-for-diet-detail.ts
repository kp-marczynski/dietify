import { Component, OnInit } from '@angular/core';
import { MealPlanUnsuitableForDiet } from './meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-plan-unsuitable-for-diet-detail',
    templateUrl: 'meal-plan-unsuitable-for-diet-detail.html'
})
export class MealPlanUnsuitableForDietDetailPage implements OnInit {
    mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet;

    constructor(
        private navController: NavController,
        private mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealPlanUnsuitableForDiet = response.data;
        });
    }

    open(item: MealPlanUnsuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/meal-plan-unsuitable-for-diet/' + item.id + '/edit');
    }

    async deleteModal(item: MealPlanUnsuitableForDiet) {
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
                        this.mealPlanUnsuitableForDietService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-plan-unsuitable-for-diet');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
