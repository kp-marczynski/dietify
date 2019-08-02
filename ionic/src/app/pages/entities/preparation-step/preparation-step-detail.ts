import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { PreparationStep } from './preparation-step.model';
import { PreparationStepService } from './preparation-step.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-preparation-step-detail',
    templateUrl: 'preparation-step-detail.html'
})
export class PreparationStepDetailPage implements OnInit {
    preparationStep: PreparationStep;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private preparationStepService: PreparationStepService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.preparationStep = response.data;
        });
    }

    open(item: PreparationStep) {
        this.navController.navigateForward('/tabs/entities/preparation-step/' + item.id + '/edit');
    }

    async deleteModal(item: PreparationStep) {
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
                        this.preparationStepService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/preparation-step');
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
