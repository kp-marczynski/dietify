import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { PatientCard } from './patient-card.model';
import { PatientCardService } from './patient-card.service';

@Component({
    selector: 'page-patient-card',
    templateUrl: 'patient-card.html'
})
export class PatientCardPage {
    patientCards: PatientCard[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private patientCardService: PatientCardService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.patientCards = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.patientCardService.query().pipe(
            filter((res: HttpResponse<PatientCard[]>) => res.ok),
            map((res: HttpResponse<PatientCard[]>) => res.body)
        )
        .subscribe(
            (response: PatientCard[]) => {
                this.patientCards = response;
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

    trackId(index: number, item: PatientCard) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/patient-card/new');
    }

    edit(item: IonItemSliding, patientCard: PatientCard) {
        this.navController.navigateForward('/tabs/entities/patient-card/' + patientCard.id + '/edit');
        item.close();
    }

    async delete(patientCard) {
        this.patientCardService.delete(patientCard.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'PatientCard deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(patientCard: PatientCard) {
        this.navController.navigateForward('/tabs/entities/patient-card/' + patientCard.id + '/view');
    }
}
