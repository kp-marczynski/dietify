import { Component, OnInit } from '@angular/core';
import { OwnedKitchenAppliance } from './owned-kitchen-appliance.model';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-owned-kitchen-appliance-detail',
    templateUrl: 'owned-kitchen-appliance-detail.html'
})
export class OwnedKitchenApplianceDetailPage implements OnInit {
    ownedKitchenAppliance: OwnedKitchenAppliance;

    constructor(
        private navController: NavController,
        private ownedKitchenApplianceService: OwnedKitchenApplianceService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.ownedKitchenAppliance = response.data;
        });
    }

    open(item: OwnedKitchenAppliance) {
        this.navController.navigateForward('/tabs/entities/owned-kitchen-appliance/' + item.id + '/edit');
    }

    async deleteModal(item: OwnedKitchenAppliance) {
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
                        this.ownedKitchenApplianceService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/owned-kitchen-appliance');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
