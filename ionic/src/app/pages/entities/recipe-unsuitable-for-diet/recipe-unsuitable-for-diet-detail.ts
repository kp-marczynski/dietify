import { Component, OnInit } from '@angular/core';
import { RecipeUnsuitableForDiet } from './recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-recipe-unsuitable-for-diet-detail',
    templateUrl: 'recipe-unsuitable-for-diet-detail.html'
})
export class RecipeUnsuitableForDietDetailPage implements OnInit {
    recipeUnsuitableForDiet: RecipeUnsuitableForDiet;

    constructor(
        private navController: NavController,
        private recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.recipeUnsuitableForDiet = response.data;
        });
    }

    open(item: RecipeUnsuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/recipe-unsuitable-for-diet/' + item.id + '/edit');
    }

    async deleteModal(item: RecipeUnsuitableForDiet) {
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
                        this.recipeUnsuitableForDietService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/recipe-unsuitable-for-diet');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
