import { Component, OnInit } from '@angular/core';
import { MealTypeTranslation } from './meal-type-translation.model';
import { MealTypeTranslationService } from './meal-type-translation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-type-translation-detail',
    templateUrl: 'meal-type-translation-detail.html'
})
export class MealTypeTranslationDetailPage implements OnInit {
    mealTypeTranslation: MealTypeTranslation;

    constructor(
        private navController: NavController,
        private mealTypeTranslationService: MealTypeTranslationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealTypeTranslation = response.data;
        });
    }

    open(item: MealTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/meal-type-translation/' + item.id + '/edit');
    }

    async deleteModal(item: MealTypeTranslation) {
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
                        this.mealTypeTranslationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-type-translation');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
