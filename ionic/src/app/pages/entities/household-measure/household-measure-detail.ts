import { Component, OnInit } from '@angular/core';
import { HouseholdMeasure } from './household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-household-measure-detail',
    templateUrl: 'household-measure-detail.html'
})
export class HouseholdMeasureDetailPage implements OnInit {
    householdMeasure: HouseholdMeasure;

    constructor(
        private navController: NavController,
        private householdMeasureService: HouseholdMeasureService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.householdMeasure = response.data;
        });
    }

    open(item: HouseholdMeasure) {
        this.navController.navigateForward('/tabs/entities/household-measure/' + item.id + '/edit');
    }

    async deleteModal(item: HouseholdMeasure) {
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
                        this.householdMeasureService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/household-measure');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
