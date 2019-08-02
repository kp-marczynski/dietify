import { Component, OnInit } from '@angular/core';
import { MealType } from './meal-type.model';
import { MealTypeService } from './meal-type.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-type-detail',
    templateUrl: 'meal-type-detail.html'
})
export class MealTypeDetailPage implements OnInit {
    mealType: MealType;

    constructor(
        private navController: NavController,
        private mealTypeService: MealTypeService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealType = response.data;
        });
    }

    open(item: MealType) {
        this.navController.navigateForward('/tabs/entities/meal-type/' + item.id + '/edit');
    }

    async deleteModal(item: MealType) {
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
                        this.mealTypeService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-type');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
