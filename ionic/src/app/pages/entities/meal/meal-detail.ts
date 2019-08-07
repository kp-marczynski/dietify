import { Component, OnInit } from '@angular/core';
import { Meal } from './meal.model';
import { MealService } from './meal.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-detail',
    templateUrl: 'meal-detail.html'
})
export class MealDetailPage implements OnInit {
    meal: Meal;

    constructor(
        private navController: NavController,
        private mealService: MealService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.meal = response.data;
        });
    }

    open(item: Meal) {
        this.navController.navigateForward('/tabs/entities/meal/' + item.id + '/edit');
    }

    async deleteModal(item: Meal) {
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
                        this.mealService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
