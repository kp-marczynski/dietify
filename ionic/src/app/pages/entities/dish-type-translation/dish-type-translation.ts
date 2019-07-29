import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DishTypeTranslation } from './dish-type-translation.model';
import { DishTypeTranslationService } from './dish-type-translation.service';

@Component({
    selector: 'page-dish-type-translation',
    templateUrl: 'dish-type-translation.html'
})
export class DishTypeTranslationPage {
    dishTypeTranslations: DishTypeTranslation[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private dishTypeTranslationService: DishTypeTranslationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.dishTypeTranslations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.dishTypeTranslationService.query().pipe(
            filter((res: HttpResponse<DishTypeTranslation[]>) => res.ok),
            map((res: HttpResponse<DishTypeTranslation[]>) => res.body)
        )
        .subscribe(
            (response: DishTypeTranslation[]) => {
                this.dishTypeTranslations = response;
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

    trackId(index: number, item: DishTypeTranslation) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/dish-type-translation/new');
    }

    edit(item: IonItemSliding, dishTypeTranslation: DishTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/dish-type-translation/' + dishTypeTranslation.id + '/edit');
        item.close();
    }

    async delete(dishTypeTranslation) {
        this.dishTypeTranslationService.delete(dishTypeTranslation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'DishTypeTranslation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(dishTypeTranslation: DishTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/dish-type-translation/' + dishTypeTranslation.id + '/view');
    }
}
