import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { LandingPageCard } from './landing-page-card.model';
import { LandingPageCardService } from './landing-page-card.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-landing-page-card-detail',
    templateUrl: 'landing-page-card-detail.html'
})
export class LandingPageCardDetailPage implements OnInit {
    landingPageCard: LandingPageCard;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private landingPageCardService: LandingPageCardService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.landingPageCard = response.data;
        });
    }

    open(item: LandingPageCard) {
        this.navController.navigateForward('/tabs/entities/landing-page-card/' + item.id + '/edit');
    }

    async deleteModal(item: LandingPageCard) {
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
                        this.landingPageCardService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/landing-page-card');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
