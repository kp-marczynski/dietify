import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserExtraInfo } from './user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-user-extra-info-update',
    templateUrl: 'user-extra-info-update.html'
})
export class UserExtraInfoUpdatePage implements OnInit {

    userExtraInfo: UserExtraInfo;
    users: User[];
    dateOfBirthDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        gender: [null, []],
        dateOfBirth: [null, []],
        phoneNumber: [null, []],
        streetAddress: [null, []],
        postalCode: [null, []],
        city: [null, []],
        country: [null, []],
        personalDescription: [null, []],
        user: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private userService: UserService,
        private userExtraInfoService: UserExtraInfoService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.userExtraInfo = response.data;
            this.isNew = this.userExtraInfo.id === null || this.userExtraInfo.id === undefined;
        });
    }

    updateForm(userExtraInfo: UserExtraInfo) {
        this.form.patchValue({
            id: userExtraInfo.id,
            gender: userExtraInfo.gender,
            dateOfBirth: userExtraInfo.dateOfBirth,
            phoneNumber: userExtraInfo.phoneNumber,
            streetAddress: userExtraInfo.streetAddress,
            postalCode: userExtraInfo.postalCode,
            city: userExtraInfo.city,
            country: userExtraInfo.country,
            personalDescription: userExtraInfo.personalDescription,
            user: userExtraInfo.user,
        });
    }

    save() {
        this.isSaving = true;
        const userExtraInfo = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.userExtraInfoService.update(userExtraInfo));
        } else {
            this.subscribeToSaveResponse(this.userExtraInfoService.create(userExtraInfo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<UserExtraInfo>>) {
        result.subscribe((res: HttpResponse<UserExtraInfo>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `UserExtraInfo ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/user-extra-info');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): UserExtraInfo {
        return {
            ...new UserExtraInfo(),
            id: this.form.get(['id']).value,
            gender: this.form.get(['gender']).value,
            dateOfBirth: this.form.get(['dateOfBirth']).value,
            phoneNumber: this.form.get(['phoneNumber']).value,
            streetAddress: this.form.get(['streetAddress']).value,
            postalCode: this.form.get(['postalCode']).value,
            city: this.form.get(['city']).value,
            country: this.form.get(['country']).value,
            personalDescription: this.form.get(['personalDescription']).value,
            user: this.form.get(['user']).value,
        };
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
