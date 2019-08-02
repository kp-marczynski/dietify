import { Component, OnInit } from '@angular/core';
import { DietTypeTranslation } from './diet-type-translation.model';
import { DietTypeTranslationService } from './diet-type-translation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-diet-type-translation-detail',
    templateUrl: 'diet-type-translation-detail.html'
})
export class DietTypeTranslationDetailPage implements OnInit {
    dietTypeTranslation: DietTypeTranslation;

    constructor(
        private navController: NavController,
        private dietTypeTranslationService: DietTypeTranslationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.dietTypeTranslation = response.data;
        });
    }

    open(item: DietTypeTranslation) {
        this.navController.navigateForward('/tabs/entities/diet-type-translation/' + item.id + '/edit');
    }

    async deleteModal(item: DietTypeTranslation) {
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
                        this.dietTypeTranslationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/diet-type-translation');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
