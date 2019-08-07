import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';

@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html'
})
export class AppointmentPage {
    appointments: Appointment[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private appointmentService: AppointmentService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.appointments = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.appointmentService.query().pipe(
            filter((res: HttpResponse<Appointment[]>) => res.ok),
            map((res: HttpResponse<Appointment[]>) => res.body)
        )
        .subscribe(
            (response: Appointment[]) => {
                this.appointments = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Appointment) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/appointment/new');
    }

    edit(item: IonItemSliding, appointment: Appointment) {
        this.navController.navigateForward('/tabs/entities/appointment/' + appointment.id + '/edit');
        item.close();
    }

    async delete(appointment) {
        this.appointmentService.delete(appointment.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Appointment deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(appointment: Appointment) {
        this.navController.navigateForward('/tabs/entities/appointment/' + appointment.id + '/view');
    }
}
