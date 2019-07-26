import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ProductBasicNutritionData } from './product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';

@Component({
    selector: 'page-product-basic-nutrition-data',
    templateUrl: 'product-basic-nutrition-data.html'
})
export class ProductBasicNutritionDataPage {
    productBasicNutritionData: ProductBasicNutritionData[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private productBasicNutritionDataService: ProductBasicNutritionDataService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.productBasicNutritionData = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.productBasicNutritionDataService.query().pipe(
            filter((res: HttpResponse<ProductBasicNutritionData[]>) => res.ok),
            map((res: HttpResponse<ProductBasicNutritionData[]>) => res.body)
        )
        .subscribe(
            (response: ProductBasicNutritionData[]) => {
                this.productBasicNutritionData = response;
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

    trackId(index: number, item: ProductBasicNutritionData) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/product-basic-nutrition-data/new');
    }

    edit(item: IonItemSliding, productBasicNutritionData: ProductBasicNutritionData) {
        this.navController.navigateForward('/tabs/entities/product-basic-nutrition-data/' + productBasicNutritionData.id + '/edit');
        item.close();
    }

    async delete(productBasicNutritionData) {
        this.productBasicNutritionDataService.delete(productBasicNutritionData.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ProductBasicNutritionData deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(productBasicNutritionData: ProductBasicNutritionData) {
        this.navController.navigateForward('/tabs/entities/product-basic-nutrition-data/' + productBasicNutritionData.id + '/view');
    }
}
