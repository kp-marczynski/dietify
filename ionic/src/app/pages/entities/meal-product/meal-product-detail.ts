import { Component, OnInit } from '@angular/core';
import { MealProduct } from './meal-product.model';
import { MealProductService } from './meal-product.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-meal-product-detail',
    templateUrl: 'meal-product-detail.html'
})
export class MealProductDetailPage implements OnInit {
    mealProduct: MealProduct;

    constructor(
        private navController: NavController,
        private mealProductService: MealProductService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.mealProduct = response.data;
        });
    }

    open(item: MealProduct) {
        this.navController.navigateForward('/tabs/entities/meal-product/' + item.id + '/edit');
    }

    async deleteModal(item: MealProduct) {
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
                        this.mealProductService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/meal-product');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
