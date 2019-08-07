import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealDefinition } from './meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';

@Component({
    selector: 'page-meal-definition',
    templateUrl: 'meal-definition.html'
})
export class MealDefinitionPage {
    mealDefinitions: MealDefinition[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealDefinitionService: MealDefinitionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealDefinitions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealDefinitionService.query().pipe(
            filter((res: HttpResponse<MealDefinition[]>) => res.ok),
            map((res: HttpResponse<MealDefinition[]>) => res.body)
        )
        .subscribe(
            (response: MealDefinition[]) => {
                this.mealDefinitions = response;
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

    trackId(index: number, item: MealDefinition) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-definition/new');
    }

    edit(item: IonItemSliding, mealDefinition: MealDefinition) {
        this.navController.navigateForward('/tabs/entities/meal-definition/' + mealDefinition.id + '/edit');
        item.close();
    }

    async delete(mealDefinition) {
        this.mealDefinitionService.delete(mealDefinition.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealDefinition deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealDefinition: MealDefinition) {
        this.navController.navigateForward('/tabs/entities/meal-definition/' + mealDefinition.id + '/view');
    }
}
