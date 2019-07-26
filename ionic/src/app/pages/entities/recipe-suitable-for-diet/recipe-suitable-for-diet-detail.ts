import { Component, OnInit } from '@angular/core';
import { RecipeSuitableForDiet } from './recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-recipe-suitable-for-diet-detail',
    templateUrl: 'recipe-suitable-for-diet-detail.html'
})
export class RecipeSuitableForDietDetailPage implements OnInit {
    recipeSuitableForDiet: RecipeSuitableForDiet;

    constructor(
        private navController: NavController,
        private recipeSuitableForDietService: RecipeSuitableForDietService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.recipeSuitableForDiet = response.data;
        });
    }

    open(item: RecipeSuitableForDiet) {
        this.navController.navigateForward('/tabs/entities/recipe-suitable-for-diet/' + item.id + '/edit');
    }

    async deleteModal(item: RecipeSuitableForDiet) {
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
                        this.recipeSuitableForDietService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/recipe-suitable-for-diet');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
