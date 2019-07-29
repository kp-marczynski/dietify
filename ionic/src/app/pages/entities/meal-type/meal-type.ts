import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealType } from './meal-type.model';
import { MealTypeService } from './meal-type.service';

@Component({
    selector: 'page-meal-type',
    templateUrl: 'meal-type.html'
})
export class MealTypePage {
    mealTypes: MealType[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealTypeService: MealTypeService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealTypes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealTypeService.query().pipe(
            filter((res: HttpResponse<MealType[]>) => res.ok),
            map((res: HttpResponse<MealType[]>) => res.body)
        )
        .subscribe(
            (response: MealType[]) => {
                this.mealTypes = response;
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

    trackId(index: number, item: MealType) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-type/new');
    }

    edit(item: IonItemSliding, mealType: MealType) {
        this.navController.navigateForward('/tabs/entities/meal-type/' + mealType.id + '/edit');
        item.close();
    }

    async delete(mealType) {
        this.mealTypeService.delete(mealType.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealType deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealType: MealType) {
        this.navController.navigateForward('/tabs/entities/meal-type/' + mealType.id + '/view');
    }
}
