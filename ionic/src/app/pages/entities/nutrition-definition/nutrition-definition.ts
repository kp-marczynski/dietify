import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { NutritionDefinition } from './nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';

@Component({
    selector: 'page-nutrition-definition',
    templateUrl: 'nutrition-definition.html'
})
export class NutritionDefinitionPage {
    nutritionDefinitions: NutritionDefinition[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private nutritionDefinitionService: NutritionDefinitionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.nutritionDefinitions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.nutritionDefinitionService.query().pipe(
            filter((res: HttpResponse<NutritionDefinition[]>) => res.ok),
            map((res: HttpResponse<NutritionDefinition[]>) => res.body)
        )
        .subscribe(
            (response: NutritionDefinition[]) => {
                this.nutritionDefinitions = response;
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

    trackId(index: number, item: NutritionDefinition) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/nutrition-definition/new');
    }

    edit(item: IonItemSliding, nutritionDefinition: NutritionDefinition) {
        this.navController.navigateForward('/tabs/entities/nutrition-definition/' + nutritionDefinition.id + '/edit');
        item.close();
    }

    async delete(nutritionDefinition) {
        this.nutritionDefinitionService.delete(nutritionDefinition.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'NutritionDefinition deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(nutritionDefinition: NutritionDefinition) {
        this.navController.navigateForward('/tabs/entities/nutrition-definition/' + nutritionDefinition.id + '/view');
    }
}
