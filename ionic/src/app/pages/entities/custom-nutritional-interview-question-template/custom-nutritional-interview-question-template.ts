import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { CustomNutritionalInterviewQuestionTemplate } from './custom-nutritional-interview-question-template.model';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';

@Component({
    selector: 'page-custom-nutritional-interview-question-template',
    templateUrl: 'custom-nutritional-interview-question-template.html'
})
export class CustomNutritionalInterviewQuestionTemplatePage {
    customNutritionalInterviewQuestionTemplates: CustomNutritionalInterviewQuestionTemplate[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private customNutritionalInterviewQuestionTemplateService: CustomNutritionalInterviewQuestionTemplateService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.customNutritionalInterviewQuestionTemplates = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.customNutritionalInterviewQuestionTemplateService.query().pipe(
            filter((res: HttpResponse<CustomNutritionalInterviewQuestionTemplate[]>) => res.ok),
            map((res: HttpResponse<CustomNutritionalInterviewQuestionTemplate[]>) => res.body)
        )
        .subscribe(
            (response: CustomNutritionalInterviewQuestionTemplate[]) => {
                this.customNutritionalInterviewQuestionTemplates = response;
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

    trackId(index: number, item: CustomNutritionalInterviewQuestionTemplate) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question-template/new');
    }

    edit(item: IonItemSliding, customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate) {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question-template/' + customNutritionalInterviewQuestionTemplate.id + '/edit');
        item.close();
    }

    async delete(customNutritionalInterviewQuestionTemplate) {
        this.customNutritionalInterviewQuestionTemplateService.delete(customNutritionalInterviewQuestionTemplate.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'CustomNutritionalInterviewQuestionTemplate deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate) {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question-template/' + customNutritionalInterviewQuestionTemplate.id + '/view');
    }
}
