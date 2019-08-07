import { Component, OnInit } from '@angular/core';
import { BodyMeasurement } from './body-measurement.model';
import { BodyMeasurementService } from './body-measurement.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-body-measurement-detail',
    templateUrl: 'body-measurement-detail.html'
})
export class BodyMeasurementDetailPage implements OnInit {
    bodyMeasurement: BodyMeasurement;

    constructor(
        private navController: NavController,
        private bodyMeasurementService: BodyMeasurementService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.bodyMeasurement = response.data;
        });
    }

    open(item: BodyMeasurement) {
        this.navController.navigateForward('/tabs/entities/body-measurement/' + item.id + '/edit');
    }

    async deleteModal(item: BodyMeasurement) {
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
                        this.bodyMeasurementService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/body-measurement');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
