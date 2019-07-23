import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IUserExtraInfo, UserExtraInfo } from 'app/shared/model/user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-user-extra-info-update',
  templateUrl: './user-extra-info-update.component.html'
})
export class UserExtraInfoUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];
  dateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    gender: [],
    dateOfBirth: [],
    phoneNumber: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    streetAddress: [null, [Validators.minLength(1), Validators.maxLength(255)]],
    postalCode: [null, [Validators.minLength(1), Validators.maxLength(20)]],
    city: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    country: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    personalDescription: [],
    user: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected userExtraInfoService: UserExtraInfoService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userExtraInfo }) => {
      this.updateForm(userExtraInfo);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userExtraInfo: IUserExtraInfo) {
    this.editForm.patchValue({
      id: userExtraInfo.id,
      gender: userExtraInfo.gender,
      dateOfBirth: userExtraInfo.dateOfBirth,
      phoneNumber: userExtraInfo.phoneNumber,
      streetAddress: userExtraInfo.streetAddress,
      postalCode: userExtraInfo.postalCode,
      city: userExtraInfo.city,
      country: userExtraInfo.country,
      personalDescription: userExtraInfo.personalDescription,
      user: userExtraInfo.user
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userExtraInfo = this.createFromForm();
    if (userExtraInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraInfoService.update(userExtraInfo));
    } else {
      this.subscribeToSaveResponse(this.userExtraInfoService.create(userExtraInfo));
    }
  }

  private createFromForm(): IUserExtraInfo {
    return {
      ...new UserExtraInfo(),
      id: this.editForm.get(['id']).value,
      gender: this.editForm.get(['gender']).value,
      dateOfBirth: this.editForm.get(['dateOfBirth']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      streetAddress: this.editForm.get(['streetAddress']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      city: this.editForm.get(['city']).value,
      country: this.editForm.get(['country']).value,
      personalDescription: this.editForm.get(['personalDescription']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtraInfo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
