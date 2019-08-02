import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { NutritionalInterview } from './nutritional-interview.model';
import { NutritionalInterviewService } from './nutritional-interview.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-nutritional-interview-detail',
    templateUrl: 'nutritional-interview-detail.html'
})
export class NutritionalInterviewDetailPage implements OnInit {
    nutritionalInterview: NutritionalInterview;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private nutritionalInterviewService: NutritionalInterviewService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.nutritionalInterview = response.data;
        });
    }

    open(item: NutritionalInterview) {
        this.navController.navigateForward('/tabs/entities/nutritional-interview/' + item.id + '/edit');
    }

    async deleteModal(item: NutritionalInterview) {
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
                        this.nutritionalInterviewService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/nutritional-interview');
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
