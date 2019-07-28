import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { NutritionDefinitionTranslation } from './nutrition-definition-translation.model';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';

@Component({
    selector: 'page-nutrition-definition-translation',
    templateUrl: 'nutrition-definition-translation.html'
})
export class NutritionDefinitionTranslationPage {
    nutritionDefinitionTranslations: NutritionDefinitionTranslation[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private nutritionDefinitionTranslationService: NutritionDefinitionTranslationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.nutritionDefinitionTranslations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.nutritionDefinitionTranslationService.query().pipe(
            filter((res: HttpResponse<NutritionDefinitionTranslation[]>) => res.ok),
            map((res: HttpResponse<NutritionDefinitionTranslation[]>) => res.body)
        )
        .subscribe(
            (response: NutritionDefinitionTranslation[]) => {
                this.nutritionDefinitionTranslations = response;
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

    trackId(index: number, item: NutritionDefinitionTranslation) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/nutrition-definition-translation/new');
    }

    edit(item: IonItemSliding, nutritionDefinitionTranslation: NutritionDefinitionTranslation) {
        this.navController.navigateForward('/tabs/entities/nutrition-definition-translation/' + nutritionDefinitionTranslation.id + '/edit');
        item.close();
    }

    async delete(nutritionDefinitionTranslation) {
        this.nutritionDefinitionTranslationService.delete(nutritionDefinitionTranslation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'NutritionDefinitionTranslation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(nutritionDefinitionTranslation: NutritionDefinitionTranslation) {
        this.navController.navigateForward('/tabs/entities/nutrition-definition-translation/' + nutritionDefinitionTranslation.id + '/view');
    }
}
