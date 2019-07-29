import { Component, OnInit } from '@angular/core';
import { ProductPortion } from './product-portion.model';
import { ProductPortionService } from './product-portion.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-product-portion-detail',
    templateUrl: 'product-portion-detail.html'
})
export class ProductPortionDetailPage implements OnInit {
    productPortion: ProductPortion;

    constructor(
        private navController: NavController,
        private productPortionService: ProductPortionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.productPortion = response.data;
        });
    }

    open(item: ProductPortion) {
        this.navController.navigateForward('/tabs/entities/product-portion/' + item.id + '/edit');
    }

    async deleteModal(item: ProductPortion) {
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
                        this.productPortionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/product-portion');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
