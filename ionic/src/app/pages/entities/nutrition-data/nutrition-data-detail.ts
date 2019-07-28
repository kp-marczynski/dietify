import { Component, OnInit } from '@angular/core';
import { NutritionData } from './nutrition-data.model';
import { NutritionDataService } from './nutrition-data.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-nutrition-data-detail',
    templateUrl: 'nutrition-data-detail.html'
})
export class NutritionDataDetailPage implements OnInit {
    nutritionData: NutritionData;

    constructor(
        private navController: NavController,
        private nutritionDataService: NutritionDataService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.nutritionData = response.data;
        });
    }

    open(item: NutritionData) {
        this.navController.navigateForward('/tabs/entities/nutrition-data/' + item.id + '/edit');
    }

    async deleteModal(item: NutritionData) {
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
                        this.nutritionDataService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/nutrition-data');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
