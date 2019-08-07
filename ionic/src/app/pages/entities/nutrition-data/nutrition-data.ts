import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { NutritionData } from './nutrition-data.model';
import { NutritionDataService } from './nutrition-data.service';

@Component({
    selector: 'page-nutrition-data',
    templateUrl: 'nutrition-data.html'
})
export class NutritionDataPage {
    nutritionData: NutritionData[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private nutritionDataService: NutritionDataService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.nutritionData = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.nutritionDataService.query().pipe(
            filter((res: HttpResponse<NutritionData[]>) => res.ok),
            map((res: HttpResponse<NutritionData[]>) => res.body)
        )
        .subscribe(
            (response: NutritionData[]) => {
                this.nutritionData = response;
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

    trackId(index: number, item: NutritionData) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/nutrition-data/new');
    }

    edit(item: IonItemSliding, nutritionData: NutritionData) {
        this.navController.navigateForward('/tabs/entities/nutrition-data/' + nutritionData.id + '/edit');
        item.close();
    }

    async delete(nutritionData) {
        this.nutritionDataService.delete(nutritionData.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'NutritionData deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(nutritionData: NutritionData) {
        this.navController.navigateForward('/tabs/entities/nutrition-data/' + nutritionData.id + '/view');
    }
}
