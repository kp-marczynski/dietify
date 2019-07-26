import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { BodyMeasurement } from './body-measurement.model';
import { BodyMeasurementService } from './body-measurement.service';

@Component({
    selector: 'page-body-measurement',
    templateUrl: 'body-measurement.html'
})
export class BodyMeasurementPage {
    bodyMeasurements: BodyMeasurement[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private bodyMeasurementService: BodyMeasurementService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.bodyMeasurements = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.bodyMeasurementService.query().pipe(
            filter((res: HttpResponse<BodyMeasurement[]>) => res.ok),
            map((res: HttpResponse<BodyMeasurement[]>) => res.body)
        )
        .subscribe(
            (response: BodyMeasurement[]) => {
                this.bodyMeasurements = response;
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

    trackId(index: number, item: BodyMeasurement) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/body-measurement/new');
    }

    edit(item: IonItemSliding, bodyMeasurement: BodyMeasurement) {
        this.navController.navigateForward('/tabs/entities/body-measurement/' + bodyMeasurement.id + '/edit');
        item.close();
    }

    async delete(bodyMeasurement) {
        this.bodyMeasurementService.delete(bodyMeasurement.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'BodyMeasurement deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(bodyMeasurement: BodyMeasurement) {
        this.navController.navigateForward('/tabs/entities/body-measurement/' + bodyMeasurement.id + '/view');
    }
}
