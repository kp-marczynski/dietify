import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ProductPortion } from './product-portion.model';
import { ProductPortionService } from './product-portion.service';

@Component({
    selector: 'page-product-portion',
    templateUrl: 'product-portion.html'
})
export class ProductPortionPage {
    productPortions: ProductPortion[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private productPortionService: ProductPortionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.productPortions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.productPortionService.query().pipe(
            filter((res: HttpResponse<ProductPortion[]>) => res.ok),
            map((res: HttpResponse<ProductPortion[]>) => res.body)
        )
        .subscribe(
            (response: ProductPortion[]) => {
                this.productPortions = response;
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

    trackId(index: number, item: ProductPortion) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/product-portion/new');
    }

    edit(item: IonItemSliding, productPortion: ProductPortion) {
        this.navController.navigateForward('/tabs/entities/product-portion/' + productPortion.id + '/edit');
        item.close();
    }

    async delete(productPortion) {
        this.productPortionService.delete(productPortion.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ProductPortion deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(productPortion: ProductPortion) {
        this.navController.navigateForward('/tabs/entities/product-portion/' + productPortion.id + '/view');
    }
}
