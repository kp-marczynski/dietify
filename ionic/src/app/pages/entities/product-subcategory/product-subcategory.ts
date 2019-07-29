import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ProductSubcategory } from './product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';

@Component({
    selector: 'page-product-subcategory',
    templateUrl: 'product-subcategory.html'
})
export class ProductSubcategoryPage {
    productSubcategories: ProductSubcategory[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private productSubcategoryService: ProductSubcategoryService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.productSubcategories = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.productSubcategoryService.query().pipe(
            filter((res: HttpResponse<ProductSubcategory[]>) => res.ok),
            map((res: HttpResponse<ProductSubcategory[]>) => res.body)
        )
        .subscribe(
            (response: ProductSubcategory[]) => {
                this.productSubcategories = response;
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

    trackId(index: number, item: ProductSubcategory) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/product-subcategory/new');
    }

    edit(item: IonItemSliding, productSubcategory: ProductSubcategory) {
        this.navController.navigateForward('/tabs/entities/product-subcategory/' + productSubcategory.id + '/edit');
        item.close();
    }

    async delete(productSubcategory) {
        this.productSubcategoryService.delete(productSubcategory.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ProductSubcategory deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(productSubcategory: ProductSubcategory) {
        this.navController.navigateForward('/tabs/entities/product-subcategory/' + productSubcategory.id + '/view');
    }
}
