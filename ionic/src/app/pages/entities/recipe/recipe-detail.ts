import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-recipe-detail',
    templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage implements OnInit {
    recipe: Recipe;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private recipeService: RecipeService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.recipe = response.data;
        });
    }

    open(item: Recipe) {
        this.navController.navigateForward('/tabs/entities/recipe/' + item.id + '/edit');
    }

    async deleteModal(item: Recipe) {
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
                        this.recipeService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/recipe');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
