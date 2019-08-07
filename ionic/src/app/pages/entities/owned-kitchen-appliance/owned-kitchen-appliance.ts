import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { OwnedKitchenAppliance } from './owned-kitchen-appliance.model';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';

@Component({
    selector: 'page-owned-kitchen-appliance',
    templateUrl: 'owned-kitchen-appliance.html'
})
export class OwnedKitchenAppliancePage {
    ownedKitchenAppliances: OwnedKitchenAppliance[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private ownedKitchenApplianceService: OwnedKitchenApplianceService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.ownedKitchenAppliances = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.ownedKitchenApplianceService.query().pipe(
            filter((res: HttpResponse<OwnedKitchenAppliance[]>) => res.ok),
            map((res: HttpResponse<OwnedKitchenAppliance[]>) => res.body)
        )
        .subscribe(
            (response: OwnedKitchenAppliance[]) => {
                this.ownedKitchenAppliances = response;
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

    trackId(index: number, item: OwnedKitchenAppliance) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/owned-kitchen-appliance/new');
    }

    edit(item: IonItemSliding, ownedKitchenAppliance: OwnedKitchenAppliance) {
        this.navController.navigateForward('/tabs/entities/owned-kitchen-appliance/' + ownedKitchenAppliance.id + '/edit');
        item.close();
    }

    async delete(ownedKitchenAppliance) {
        this.ownedKitchenApplianceService.delete(ownedKitchenAppliance.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'OwnedKitchenAppliance deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(ownedKitchenAppliance: OwnedKitchenAppliance) {
        this.navController.navigateForward('/tabs/entities/owned-kitchen-appliance/' + ownedKitchenAppliance.id + '/view');
    }
}
