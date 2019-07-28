import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { LandingPageCard } from './landing-page-card.model';
import { LandingPageCardService } from './landing-page-card.service';

@Component({
    selector: 'page-landing-page-card',
    templateUrl: 'landing-page-card.html'
})
export class LandingPageCardPage {
    landingPageCards: LandingPageCard[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private landingPageCardService: LandingPageCardService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.landingPageCards = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.landingPageCardService.query().pipe(
            filter((res: HttpResponse<LandingPageCard[]>) => res.ok),
            map((res: HttpResponse<LandingPageCard[]>) => res.body)
        )
        .subscribe(
            (response: LandingPageCard[]) => {
                this.landingPageCards = response;
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

    trackId(index: number, item: LandingPageCard) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/landing-page-card/new');
    }

    edit(item: IonItemSliding, landingPageCard: LandingPageCard) {
        this.navController.navigateForward('/tabs/entities/landing-page-card/' + landingPageCard.id + '/edit');
        item.close();
    }

    async delete(landingPageCard) {
        this.landingPageCardService.delete(landingPageCard.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'LandingPageCard deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(landingPageCard: LandingPageCard) {
        this.navController.navigateForward('/tabs/entities/landing-page-card/' + landingPageCard.id + '/view');
    }
}
