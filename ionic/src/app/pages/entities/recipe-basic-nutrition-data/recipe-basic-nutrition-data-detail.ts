import { Component, OnInit } from '@angular/core';
import { RecipeBasicNutritionData } from './recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-recipe-basic-nutrition-data-detail',
    templateUrl: 'recipe-basic-nutrition-data-detail.html'
})
export class RecipeBasicNutritionDataDetailPage implements OnInit {
    recipeBasicNutritionData: RecipeBasicNutritionData;

    constructor(
        private navController: NavController,
        private recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.recipeBasicNutritionData = response.data;
        });
    }

    open(item: RecipeBasicNutritionData) {
        this.navController.navigateForward('/tabs/entities/recipe-basic-nutrition-data/' + item.id + '/edit');
    }

    async deleteModal(item: RecipeBasicNutritionData) {
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
                        this.recipeBasicNutritionDataService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/recipe-basic-nutrition-data');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
