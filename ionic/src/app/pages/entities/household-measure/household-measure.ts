import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { HouseholdMeasure } from './household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';

@Component({
    selector: 'page-household-measure',
    templateUrl: 'household-measure.html'
})
export class HouseholdMeasurePage {
    householdMeasures: HouseholdMeasure[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private householdMeasureService: HouseholdMeasureService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.householdMeasures = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.householdMeasureService.query().pipe(
            filter((res: HttpResponse<HouseholdMeasure[]>) => res.ok),
            map((res: HttpResponse<HouseholdMeasure[]>) => res.body)
        )
        .subscribe(
            (response: HouseholdMeasure[]) => {
                this.householdMeasures = response;
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

    trackId(index: number, item: HouseholdMeasure) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/household-measure/new');
    }

    edit(item: IonItemSliding, householdMeasure: HouseholdMeasure) {
        this.navController.navigateForward('/tabs/entities/household-measure/' + householdMeasure.id + '/edit');
        item.close();
    }

    async delete(householdMeasure) {
        this.householdMeasureService.delete(householdMeasure.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'HouseholdMeasure deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(householdMeasure: HouseholdMeasure) {
        this.navController.navigateForward('/tabs/entities/household-measure/' + householdMeasure.id + '/view');
    }
}
