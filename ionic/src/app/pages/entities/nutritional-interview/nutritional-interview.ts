import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { NutritionalInterview } from './nutritional-interview.model';
import { NutritionalInterviewService } from './nutritional-interview.service';

@Component({
    selector: 'page-nutritional-interview',
    templateUrl: 'nutritional-interview.html'
})
export class NutritionalInterviewPage {
    nutritionalInterviews: NutritionalInterview[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private nutritionalInterviewService: NutritionalInterviewService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.nutritionalInterviews = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.nutritionalInterviewService.query().pipe(
            filter((res: HttpResponse<NutritionalInterview[]>) => res.ok),
            map((res: HttpResponse<NutritionalInterview[]>) => res.body)
        )
        .subscribe(
            (response: NutritionalInterview[]) => {
                this.nutritionalInterviews = response;
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

    trackId(index: number, item: NutritionalInterview) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/nutritional-interview/new');
    }

    edit(item: IonItemSliding, nutritionalInterview: NutritionalInterview) {
        this.navController.navigateForward('/tabs/entities/nutritional-interview/' + nutritionalInterview.id + '/edit');
        item.close();
    }

    async delete(nutritionalInterview) {
        this.nutritionalInterviewService.delete(nutritionalInterview.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'NutritionalInterview deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(nutritionalInterview: NutritionalInterview) {
        this.navController.navigateForward('/tabs/entities/nutritional-interview/' + nutritionalInterview.id + '/view');
    }
}
