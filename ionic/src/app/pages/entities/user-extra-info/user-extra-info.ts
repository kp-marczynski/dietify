import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { UserExtraInfo } from './user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';

@Component({
    selector: 'page-user-extra-info',
    templateUrl: 'user-extra-info.html'
})
export class UserExtraInfoPage {
    userExtraInfos: UserExtraInfo[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private userExtraInfoService: UserExtraInfoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.userExtraInfos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.userExtraInfoService.query().pipe(
            filter((res: HttpResponse<UserExtraInfo[]>) => res.ok),
            map((res: HttpResponse<UserExtraInfo[]>) => res.body)
        )
        .subscribe(
            (response: UserExtraInfo[]) => {
                this.userExtraInfos = response;
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

    trackId(index: number, item: UserExtraInfo) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/user-extra-info/new');
    }

    edit(item: IonItemSliding, userExtraInfo: UserExtraInfo) {
        this.navController.navigateForward('/tabs/entities/user-extra-info/' + userExtraInfo.id + '/edit');
        item.close();
    }

    async delete(userExtraInfo) {
        this.userExtraInfoService.delete(userExtraInfo.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'UserExtraInfo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(userExtraInfo: UserExtraInfo) {
        this.navController.navigateForward('/tabs/entities/user-extra-info/' + userExtraInfo.id + '/view');
    }
}
