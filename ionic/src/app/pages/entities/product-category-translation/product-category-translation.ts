import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ProductCategoryTranslation } from './product-category-translation.model';
import { ProductCategoryTranslationService } from './product-category-translation.service';

@Component({
    selector: 'page-product-category-translation',
    templateUrl: 'product-category-translation.html'
})
export class ProductCategoryTranslationPage {
    productCategoryTranslations: ProductCategoryTranslation[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private productCategoryTranslationService: ProductCategoryTranslationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.productCategoryTranslations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.productCategoryTranslationService.query().pipe(
            filter((res: HttpResponse<ProductCategoryTranslation[]>) => res.ok),
            map((res: HttpResponse<ProductCategoryTranslation[]>) => res.body)
        )
        .subscribe(
            (response: ProductCategoryTranslation[]) => {
                this.productCategoryTranslations = response;
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

    trackId(index: number, item: ProductCategoryTranslation) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/product-category-translation/new');
    }

    edit(item: IonItemSliding, productCategoryTranslation: ProductCategoryTranslation) {
        this.navController.navigateForward('/tabs/entities/product-category-translation/' + productCategoryTranslation.id + '/edit');
        item.close();
    }

    async delete(productCategoryTranslation) {
        this.productCategoryTranslationService.delete(productCategoryTranslation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ProductCategoryTranslation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(productCategoryTranslation: ProductCategoryTranslation) {
        this.navController.navigateForward('/tabs/entities/product-category-translation/' + productCategoryTranslation.id + '/view');
    }
}
