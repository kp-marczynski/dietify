import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealTypeTranslation } from './meal-type-translation.model';
import { MealTypeTranslationService } from './meal-type-translation.service';

@Component({
    selector: 'page-meal-type-translation',
    templateUrl: 'meal-type-translation.html'
})
export class MealTypeTranslationPage {
    mealTypeTranslations: MealTypeTranslation[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealTypeTranslationService: MealTypeTranslationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealTypeTranslations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealTypeTranslationService.query().pipe(
            filter((res: HttpResponse<MealTypeTranslation[]>) => res.ok),
            map((res: HttpResponse<MealTypeTranslation[]>) => res.body)
        )
        .subscribe(
            (response: MealTypeTranslation[]) => {
                this.mealTypeTranslations = response;
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

    trackId(index: number, item: MealTypeTranslation) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-type-translation/new');
    }

    edit(item: IonItemSliding, mealTypeTranslation: MealTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/meal-type-translation/' + mealTypeTranslation.id + '/edit');
        item.close();
    }

    async delete(mealTypeTranslation) {
        this.mealTypeTranslationService.delete(mealTypeTranslation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealTypeTranslation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealTypeTranslation: MealTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/meal-type-translation/' + mealTypeTranslation.id + '/view');
    }
}
