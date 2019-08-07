import { Component, OnInit } from '@angular/core';
import { KitchenApplianceTranslation } from './kitchen-appliance-translation.model';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-kitchen-appliance-translation-detail',
    templateUrl: 'kitchen-appliance-translation-detail.html'
})
export class KitchenApplianceTranslationDetailPage implements OnInit {
    kitchenApplianceTranslation: KitchenApplianceTranslation;

    constructor(
        private navController: NavController,
        private kitchenApplianceTranslationService: KitchenApplianceTranslationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.kitchenApplianceTranslation = response.data;
        });
    }

    open(item: KitchenApplianceTranslation) {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance-translation/' + item.id + '/edit');
    }

    async deleteModal(item: KitchenApplianceTranslation) {
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
                        this.kitchenApplianceTranslationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/kitchen-appliance-translation');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
