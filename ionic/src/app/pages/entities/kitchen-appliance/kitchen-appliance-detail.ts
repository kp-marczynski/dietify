import { Component, OnInit } from '@angular/core';
import { KitchenAppliance } from './kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-kitchen-appliance-detail',
    templateUrl: 'kitchen-appliance-detail.html'
})
export class KitchenApplianceDetailPage implements OnInit {
    kitchenAppliance: KitchenAppliance;

    constructor(
        private navController: NavController,
        private kitchenApplianceService: KitchenApplianceService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.kitchenAppliance = response.data;
        });
    }

    open(item: KitchenAppliance) {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance/' + item.id + '/edit');
    }

    async deleteModal(item: KitchenAppliance) {
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
                        this.kitchenApplianceService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/kitchen-appliance');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
