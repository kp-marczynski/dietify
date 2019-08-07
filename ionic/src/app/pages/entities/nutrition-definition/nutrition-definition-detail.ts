import { Component, OnInit } from '@angular/core';
import { NutritionDefinition } from './nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-nutrition-definition-detail',
    templateUrl: 'nutrition-definition-detail.html'
})
export class NutritionDefinitionDetailPage implements OnInit {
    nutritionDefinition: NutritionDefinition;

    constructor(
        private navController: NavController,
        private nutritionDefinitionService: NutritionDefinitionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.nutritionDefinition = response.data;
        });
    }

    open(item: NutritionDefinition) {
        this.navController.navigateForward('/tabs/entities/nutrition-definition/' + item.id + '/edit');
    }

    async deleteModal(item: NutritionDefinition) {
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
                        this.nutritionDefinitionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/nutrition-definition');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
