import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { AppointmentEvaluation } from './appointment-evaluation.model';
import { AppointmentEvaluationService } from './appointment-evaluation.service';

@Component({
    selector: 'page-appointment-evaluation',
    templateUrl: 'appointment-evaluation.html'
})
export class AppointmentEvaluationPage {
    appointmentEvaluations: AppointmentEvaluation[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private appointmentEvaluationService: AppointmentEvaluationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.appointmentEvaluations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.appointmentEvaluationService.query().pipe(
            filter((res: HttpResponse<AppointmentEvaluation[]>) => res.ok),
            map((res: HttpResponse<AppointmentEvaluation[]>) => res.body)
        )
        .subscribe(
            (response: AppointmentEvaluation[]) => {
                this.appointmentEvaluations = response;
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

    trackId(index: number, item: AppointmentEvaluation) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/appointment-evaluation/new');
    }

    edit(item: IonItemSliding, appointmentEvaluation: AppointmentEvaluation) {
        this.navController.navigateForward('/tabs/entities/appointment-evaluation/' + appointmentEvaluation.id + '/edit');
        item.close();
    }

    async delete(appointmentEvaluation) {
        this.appointmentEvaluationService.delete(appointmentEvaluation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'AppointmentEvaluation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(appointmentEvaluation: AppointmentEvaluation) {
        this.navController.navigateForward('/tabs/entities/appointment-evaluation/' + appointmentEvaluation.id + '/view');
    }
}
