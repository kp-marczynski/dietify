import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { UserExtraInfo } from './user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-user-extra-info-detail',
    templateUrl: 'user-extra-info-detail.html'
})
export class UserExtraInfoDetailPage implements OnInit {
    userExtraInfo: UserExtraInfo;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private userExtraInfoService: UserExtraInfoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.userExtraInfo = response.data;
        });
    }

    open(item: UserExtraInfo) {
        this.navController.navigateForward('/tabs/entities/user-extra-info/' + item.id + '/edit');
    }

    async deleteModal(item: UserExtraInfo) {
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
                        this.userExtraInfoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/user-extra-info');
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
