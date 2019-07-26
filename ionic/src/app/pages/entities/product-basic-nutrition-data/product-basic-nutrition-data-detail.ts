import { Component, OnInit } from '@angular/core';
import { ProductBasicNutritionData } from './product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-product-basic-nutrition-data-detail',
    templateUrl: 'product-basic-nutrition-data-detail.html'
})
export class ProductBasicNutritionDataDetailPage implements OnInit {
    productBasicNutritionData: ProductBasicNutritionData;

    constructor(
        private navController: NavController,
        private productBasicNutritionDataService: ProductBasicNutritionDataService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.productBasicNutritionData = response.data;
        });
    }

    open(item: ProductBasicNutritionData) {
        this.navController.navigateForward('/tabs/entities/product-basic-nutrition-data/' + item.id + '/edit');
    }

    async deleteModal(item: ProductBasicNutritionData) {
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
                        this.productBasicNutritionDataService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/product-basic-nutrition-data');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
