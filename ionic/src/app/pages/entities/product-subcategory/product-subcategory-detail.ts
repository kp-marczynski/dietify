import { Component, OnInit } from '@angular/core';
import { ProductSubcategory } from './product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-product-subcategory-detail',
    templateUrl: 'product-subcategory-detail.html'
})
export class ProductSubcategoryDetailPage implements OnInit {
    productSubcategory: ProductSubcategory;

    constructor(
        private navController: NavController,
        private productSubcategoryService: ProductSubcategoryService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.productSubcategory = response.data;
        });
    }

    open(item: ProductSubcategory) {
        this.navController.navigateForward('/tabs/entities/product-subcategory/' + item.id + '/edit');
    }

    async deleteModal(item: ProductSubcategory) {
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
                        this.productSubcategoryService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/product-subcategory');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
