import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DietTypeTranslation } from './diet-type-translation.model';
import { DietTypeTranslationService } from './diet-type-translation.service';

@Component({
    selector: 'page-diet-type-translation',
    templateUrl: 'diet-type-translation.html'
})
export class DietTypeTranslationPage {
    dietTypeTranslations: DietTypeTranslation[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private dietTypeTranslationService: DietTypeTranslationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.dietTypeTranslations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.dietTypeTranslationService.query().pipe(
            filter((res: HttpResponse<DietTypeTranslation[]>) => res.ok),
            map((res: HttpResponse<DietTypeTranslation[]>) => res.body)
        )
        .subscribe(
            (response: DietTypeTranslation[]) => {
                this.dietTypeTranslations = response;
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

    trackId(index: number, item: DietTypeTranslation) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/diet-type-translation/new');
    }

    edit(item: IonItemSliding, dietTypeTranslation: DietTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/diet-type-translation/' + dietTypeTranslation.id + '/edit');
        item.close();
    }

    async delete(dietTypeTranslation) {
        this.dietTypeTranslationService.delete(dietTypeTranslation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'DietTypeTranslation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(dietTypeTranslation: DietTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/diet-type-translation/' + dietTypeTranslation.id + '/view');
    }
}
