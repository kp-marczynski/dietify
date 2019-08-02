import { Component, OnInit } from '@angular/core';
import { DietType } from './diet-type.model';
import { DietTypeService } from './diet-type.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-diet-type-detail',
    templateUrl: 'diet-type-detail.html'
})
export class DietTypeDetailPage implements OnInit {
    dietType: DietType;

    constructor(
        private navController: NavController,
        private dietTypeService: DietTypeService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.dietType = response.data;
        });
    }

    open(item: DietType) {
        this.navController.navigateForward('/tabs/entities/diet-type/' + item.id + '/edit');
    }

    async deleteModal(item: DietType) {
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
                        this.dietTypeService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/diet-type');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
