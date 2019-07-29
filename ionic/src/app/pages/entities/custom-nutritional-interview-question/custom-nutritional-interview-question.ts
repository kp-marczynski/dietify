import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { CustomNutritionalInterviewQuestion } from './custom-nutritional-interview-question.model';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';

@Component({
    selector: 'page-custom-nutritional-interview-question',
    templateUrl: 'custom-nutritional-interview-question.html'
})
export class CustomNutritionalInterviewQuestionPage {
    customNutritionalInterviewQuestions: CustomNutritionalInterviewQuestion[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private customNutritionalInterviewQuestionService: CustomNutritionalInterviewQuestionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.customNutritionalInterviewQuestions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.customNutritionalInterviewQuestionService.query().pipe(
            filter((res: HttpResponse<CustomNutritionalInterviewQuestion[]>) => res.ok),
            map((res: HttpResponse<CustomNutritionalInterviewQuestion[]>) => res.body)
        )
        .subscribe(
            (response: CustomNutritionalInterviewQuestion[]) => {
                this.customNutritionalInterviewQuestions = response;
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

    trackId(index: number, item: CustomNutritionalInterviewQuestion) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question/new');
    }

    edit(item: IonItemSliding, customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion) {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question/' + customNutritionalInterviewQuestion.id + '/edit');
        item.close();
    }

    async delete(customNutritionalInterviewQuestion) {
        this.customNutritionalInterviewQuestionService.delete(customNutritionalInterviewQuestion.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'CustomNutritionalInterviewQuestion deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion) {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question/' + customNutritionalInterviewQuestion.id + '/view');
    }
}
