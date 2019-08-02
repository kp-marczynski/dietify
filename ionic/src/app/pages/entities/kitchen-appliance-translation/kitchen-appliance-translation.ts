import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { KitchenApplianceTranslation } from './kitchen-appliance-translation.model';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';

@Component({
    selector: 'page-kitchen-appliance-translation',
    templateUrl: 'kitchen-appliance-translation.html'
})
export class KitchenApplianceTranslationPage {
    kitchenApplianceTranslations: KitchenApplianceTranslation[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private kitchenApplianceTranslationService: KitchenApplianceTranslationService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.kitchenApplianceTranslations = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.kitchenApplianceTranslationService.query().pipe(
            filter((res: HttpResponse<KitchenApplianceTranslation[]>) => res.ok),
            map((res: HttpResponse<KitchenApplianceTranslation[]>) => res.body)
        )
        .subscribe(
            (response: KitchenApplianceTranslation[]) => {
                this.kitchenApplianceTranslations = response;
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

    trackId(index: number, item: KitchenApplianceTranslation) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance-translation/new');
    }

    edit(item: IonItemSliding, kitchenApplianceTranslation: KitchenApplianceTranslation) {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance-translation/' + kitchenApplianceTranslation.id + '/edit');
        item.close();
    }

    async delete(kitchenApplianceTranslation) {
        this.kitchenApplianceTranslationService.delete(kitchenApplianceTranslation.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'KitchenApplianceTranslation deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(kitchenApplianceTranslation: KitchenApplianceTranslation) {
        this.navController.navigateForward('/tabs/entities/kitchen-appliance-translation/' + kitchenApplianceTranslation.id + '/view');
    }
}
