import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { CustomNutritionalInterviewQuestion } from './custom-nutritional-interview-question.model';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-custom-nutritional-interview-question-detail',
    templateUrl: 'custom-nutritional-interview-question-detail.html'
})
export class CustomNutritionalInterviewQuestionDetailPage implements OnInit {
    customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private customNutritionalInterviewQuestionService: CustomNutritionalInterviewQuestionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.customNutritionalInterviewQuestion = response.data;
        });
    }

    open(item: CustomNutritionalInterviewQuestion) {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question/' + item.id + '/edit');
    }

    async deleteModal(item: CustomNutritionalInterviewQuestion) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.customNutritionalInterviewQuestionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
