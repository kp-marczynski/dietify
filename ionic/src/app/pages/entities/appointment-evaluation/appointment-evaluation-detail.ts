import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { AppointmentEvaluation } from './appointment-evaluation.model';
import { AppointmentEvaluationService } from './appointment-evaluation.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-appointment-evaluation-detail',
    templateUrl: 'appointment-evaluation-detail.html'
})
export class AppointmentEvaluationDetailPage implements OnInit {
    appointmentEvaluation: AppointmentEvaluation;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private appointmentEvaluationService: AppointmentEvaluationService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.appointmentEvaluation = response.data;
        });
    }

    open(item: AppointmentEvaluation) {
        this.navController.navigateForward('/tabs/entities/appointment-evaluation/' + item.id + '/edit');
    }

    async deleteModal(item: AppointmentEvaluation) {
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
                        this.appointmentEvaluationService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/appointment-evaluation');
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
