import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DietType } from './diet-type.model';
import { DietTypeService } from './diet-type.service';

@Component({
    selector: 'page-diet-type',
    templateUrl: 'diet-type.html'
})
export class DietTypePage {
    dietTypes: DietType[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private dietTypeService: DietTypeService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.dietTypes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.dietTypeService.query().pipe(
            filter((res: HttpResponse<DietType[]>) => res.ok),
            map((res: HttpResponse<DietType[]>) => res.body)
        )
        .subscribe(
            (response: DietType[]) => {
                this.dietTypes = response;
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

    trackId(index: number, item: DietType) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/diet-type/new');
    }

    edit(item: IonItemSliding, dietType: DietType) {
        this.navController.navigateForward('/tabs/entities/diet-type/' + dietType.id + '/edit');
        item.close();
    }

    async delete(dietType) {
        this.dietTypeService.delete(dietType.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'DietType deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(dietType: DietType) {
        this.navController.navigateForward('/tabs/entities/diet-type/' + dietType.id + '/view');
    }
}
