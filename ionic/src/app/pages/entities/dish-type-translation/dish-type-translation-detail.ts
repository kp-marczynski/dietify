import { Component, OnInit } from '@angular/core';
import { DishTypeTranslation } from './dish-type-translation.model';
import { DishTypeTranslationService } from './dish-type-translation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-dish-type-translation-detail',
    templateUrl: 'dish-type-translation-detail.html'
})
export class DishTypeTranslationDetailPage implements OnInit {
    dishTypeTranslation: DishTypeTranslation;

    constructor(
        private navController: NavController,
        private dishTypeTranslationService: DishTypeTranslationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.dishTypeTranslation = response.data;
        });
    }

    open(item: DishTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/dish-type-translation/' + item.id + '/edit');
    }

    async deleteModal(item: DishTypeTranslation) {
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
                        this.dishTypeTranslationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/dish-type-translation');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
