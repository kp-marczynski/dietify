import { Component, OnInit } from '@angular/core';
import { ProductCategoryTranslation } from './product-category-translation.model';
import { ProductCategoryTranslationService } from './product-category-translation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-product-category-translation-detail',
    templateUrl: 'product-category-translation-detail.html'
})
export class ProductCategoryTranslationDetailPage implements OnInit {
    productCategoryTranslation: ProductCategoryTranslation;

    constructor(
        private navController: NavController,
        private productCategoryTranslationService: ProductCategoryTranslationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.productCategoryTranslation = response.data;
        });
    }

    open(item: ProductCategoryTranslation) {
        this.navController.navigateForward('/tabs/entities/product-category-translation/' + item.id + '/edit');
    }

    async deleteModal(item: ProductCategoryTranslation) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.productCategoryTranslationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/product-category-translation');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
