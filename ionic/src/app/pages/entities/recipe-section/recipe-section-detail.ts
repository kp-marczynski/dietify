import { Component, OnInit } from '@angular/core';
import { RecipeSection } from './recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-recipe-section-detail',
    templateUrl: 'recipe-section-detail.html'
})
export class RecipeSectionDetailPage implements OnInit {
    recipeSection: RecipeSection;

    constructor(
        private navController: NavController,
        private recipeSectionService: RecipeSectionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.recipeSection = response.data;
        });
    }

    open(item: RecipeSection) {
        this.navController.navigateForward('/tabs/entities/recipe-section/' + item.id + '/edit');
    }

    async deleteModal(item: RecipeSection) {
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
                        this.recipeSectionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/recipe-section');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
