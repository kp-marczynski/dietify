import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DishType } from './dish-type.model';
import { DishTypeService } from './dish-type.service';

@Component({
    selector: 'page-dish-type',
    templateUrl: 'dish-type.html'
})
export class DishTypePage {
    dishTypes: DishType[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private dishTypeService: DishTypeService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.dishTypes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.dishTypeService.query().pipe(
            filter((res: HttpResponse<DishType[]>) => res.ok),
            map((res: HttpResponse<DishType[]>) => res.body)
        )
        .subscribe(
            (response: DishType[]) => {
                this.dishTypes = response;
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

    trackId(index: number, item: DishType) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/dish-type/new');
    }

    edit(item: IonItemSliding, dishType: DishType) {
        this.navController.navigateForward('/tabs/entities/dish-type/' + dishType.id + '/edit');
        item.close();
    }

    async delete(dishType) {
        this.dishTypeService.delete(dishType.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'DishType deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(dishType: DishType) {
        this.navController.navigateForward('/tabs/entities/dish-type/' + dishType.id + '/view');
    }
}
