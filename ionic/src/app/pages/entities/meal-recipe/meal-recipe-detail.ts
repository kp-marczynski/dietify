import { Component, OnInit } from '@angular/core';
import { MealRecipe } from './meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-recipe-detail',
    templateUrl: 'meal-recipe-detail.html'
})
export class MealRecipeDetailPage implements OnInit {
    mealRecipe: MealRecipe;

    constructor(
        private navController: NavController,
        private mealRecipeService: MealRecipeService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealRecipe = response.data;
        });
    }

    open(item: MealRecipe) {
        this.navController.navigateForward('/tabs/entities/meal-recipe/' + item.id + '/edit');
    }

    async deleteModal(item: MealRecipe) {
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
                        this.mealRecipeService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-recipe');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
