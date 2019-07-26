import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MealProduct } from './meal-product.model';
import { MealProductService } from './meal-product.service';

@Component({
    selector: 'page-meal-product',
    templateUrl: 'meal-product.html'
})
export class MealProductPage {
    mealProducts: MealProduct[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private mealProductService: MealProductService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.mealProducts = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.mealProductService.query().pipe(
            filter((res: HttpResponse<MealProduct[]>) => res.ok),
            map((res: HttpResponse<MealProduct[]>) => res.body)
        )
        .subscribe(
            (response: MealProduct[]) => {
                this.mealProducts = response;
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

    trackId(index: number, item: MealProduct) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/meal-product/new');
    }

    edit(item: IonItemSliding, mealProduct: MealProduct) {
        this.navController.navigateForward('/tabs/entities/meal-product/' + mealProduct.id + '/edit');
        item.close();
    }

    async delete(mealProduct) {
        this.mealProductService.delete(mealProduct.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MealProduct deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(mealProduct: MealProduct) {
        this.navController.navigateForward('/tabs/entities/meal-product/' + mealProduct.id + '/view');
    }
}
