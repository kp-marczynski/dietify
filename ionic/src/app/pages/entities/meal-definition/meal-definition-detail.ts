import { Component, OnInit } from '@angular/core';
import { MealDefinition } from './meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-definition-detail',
    templateUrl: 'meal-definition-detail.html'
})
export class MealDefinitionDetailPage implements OnInit {
    mealDefinition: MealDefinition;

    constructor(
        private navController: NavController,
        private mealDefinitionService: MealDefinitionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealDefinition = response.data;
        });
    }

    open(item: MealDefinition) {
        this.navController.navigateForward('/tabs/entities/meal-definition/' + item.id + '/edit');
    }

    async deleteModal(item: MealDefinition) {
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
                        this.mealDefinitionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-definition');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
