import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-appointment-detail',
    templateUrl: 'appointment-detail.html'
})
export class AppointmentDetailPage implements OnInit {
    appointment: Appointment;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private appointmentService: AppointmentService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.appointment = response.data;
        });
    }

    open(item: Appointment) {
        this.navController.navigateForward('/tabs/entities/appointment/' + item.id + '/edit');
    }

    async deleteModal(item: Appointment) {
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
                        this.appointmentService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/appointment');
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
