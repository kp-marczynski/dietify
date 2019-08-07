import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { CustomNutritionalInterviewQuestionTemplate } from './custom-nutritional-interview-question-template.model';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-custom-nutritional-interview-question-template-detail',
    templateUrl: 'custom-nutritional-interview-question-template-detail.html'
})
export class CustomNutritionalInterviewQuestionTemplateDetailPage implements OnInit {
    customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private customNutritionalInterviewQuestionTemplateService: CustomNutritionalInterviewQuestionTemplateService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.customNutritionalInterviewQuestionTemplate = response.data;
        });
    }

    open(item: CustomNutritionalInterviewQuestionTemplate) {
        this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question-template/' + item.id + '/edit');
    }

    async deleteModal(item: CustomNutritionalInterviewQuestionTemplate) {
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
                        this.customNutritionalInterviewQuestionTemplateService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/custom-nutritional-interview-question-template');
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
