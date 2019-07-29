import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { PreparationStep } from './preparation-step.model';
import { PreparationStepService } from './preparation-step.service';

@Component({
    selector: 'page-preparation-step',
    templateUrl: 'preparation-step.html'
})
export class PreparationStepPage {
    preparationSteps: PreparationStep[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private preparationStepService: PreparationStepService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.preparationSteps = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.preparationStepService.query().pipe(
            filter((res: HttpResponse<PreparationStep[]>) => res.ok),
            map((res: HttpResponse<PreparationStep[]>) => res.body)
        )
        .subscribe(
            (response: PreparationStep[]) => {
                this.preparationSteps = response;
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

    trackId(index: number, item: PreparationStep) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/preparation-step/new');
    }

    edit(item: IonItemSliding, preparationStep: PreparationStep) {
        this.navController.navigateForward('/tabs/entities/preparation-step/' + preparationStep.id + '/edit');
        item.close();
    }

    async delete(preparationStep) {
        this.preparationStepService.delete(preparationStep.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'PreparationStep deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(preparationStep: PreparationStep) {
        this.navController.navigateForward('/tabs/entities/preparation-step/' + preparationStep.id + '/view');
    }
}
