import { Component, OnInit } from '@angular/core';
import { NutritionDefinitionTranslation } from './nutrition-definition-translation.model';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-nutrition-definition-translation-detail',
    templateUrl: 'nutrition-definition-translation-detail.html'
})
export class NutritionDefinitionTranslationDetailPage implements OnInit {
    nutritionDefinitionTranslation: NutritionDefinitionTranslation;

    constructor(
        private navController: NavController,
        private nutritionDefinitionTranslationService: NutritionDefinitionTranslationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.nutritionDefinitionTranslation = response.data;
        });
    }

    open(item: NutritionDefinitionTranslation) {
        this.navController.navigateForward('/tabs/entities/nutrition-definition-translation/' + item.id + '/edit');
    }

    async deleteModal(item: NutritionDefinitionTranslation) {
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
                        this.nutritionDefinitionTranslationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/nutrition-definition-translation');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
