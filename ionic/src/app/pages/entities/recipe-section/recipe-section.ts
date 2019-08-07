import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { RecipeSection } from './recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';

@Component({
    selector: 'page-recipe-section',
    templateUrl: 'recipe-section.html'
})
export class RecipeSectionPage {
    recipeSections: RecipeSection[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private recipeSectionService: RecipeSectionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.recipeSections = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.recipeSectionService.query().pipe(
            filter((res: HttpResponse<RecipeSection[]>) => res.ok),
            map((res: HttpResponse<RecipeSection[]>) => res.body)
        )
        .subscribe(
            (response: RecipeSection[]) => {
                this.recipeSections = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: RecipeSection) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/recipe-section/new');
    }

    edit(item: IonItemSliding, recipeSection: RecipeSection) {
        this.navController.navigateForward('/tabs/entities/recipe-section/' + recipeSection.id + '/edit');
        item.close();
    }

    async delete(recipeSection) {
        this.recipeSectionService.delete(recipeSection.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RecipeSection deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(recipeSection: RecipeSection) {
        this.navController.navigateForward('/tabs/entities/recipe-section/' + recipeSection.id + '/view');
    }
}
