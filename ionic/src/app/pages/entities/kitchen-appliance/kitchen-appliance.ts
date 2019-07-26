import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { KitchenAppliance } from './kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';

@Component({
    selector: 'page-kitchen-appliance',
    templateUrl: 'kitchen-appliance.html'
})
export class KitchenAppliancePage {
    kitchenAppliances: KitchenAppliance[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private kitchenApplianceService: KitchenApplianceService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.kitchenAppliances = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.kitchenApplianceService.query().pipe(
            filter((res: HttpResponse<KitchenAppliance[]>) => res.ok),
            map((res: HttpResponse<KitchenAppliance[]>) => res.body)
        )
        .subscribe(
            (response: KitchenAppliance[]) => {
                this.kitchenAppliances = response;
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

    trackId(index: number, item: KitchenAppliance) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance/new');
    }

    edit(item: IonItemSliding, kitchenAppliance: KitchenAppliance) {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance/' + kitchenAppliance.id + '/edit');
        item.close();
    }

    async delete(kitchenAppliance) {
        this.kitchenApplianceService.delete(kitchenAppliance.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'KitchenAppliance deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(kitchenAppliance: KitchenAppliance) {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance/' + kitchenAppliance.id + '/view');
    }
}
