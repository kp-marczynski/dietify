import { Component, OnInit } from '@angular/core';
import { DishType } from './dish-type.model';
import { DishTypeService } from './dish-type.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-dish-type-detail',
    templateUrl: 'dish-type-detail.html'
})
export class DishTypeDetailPage implements OnInit {
    dishType: DishType;

    constructor(
        private navController: NavController,
        private dishTypeService: DishTypeService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.dishType = response.data;
        });
    }

    open(item: DishType) {
        this.navController.navigateForward('/tabs/entities/dish-type/' + item.id + '/edit');
    }

    async deleteModal(item: DishType) {
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
                        this.dishTypeService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/dish-type');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
