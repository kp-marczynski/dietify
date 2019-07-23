import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUserExtraInfo } from 'app/shared/model/user-extra-info.model';

@Component({
  selector: 'jhi-user-extra-info-detail',
  templateUrl: './user-extra-info-detail.component.html'
})
export class UserExtraInfoDetailComponent implements OnInit {
  userExtraInfo: IUserExtraInfo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userExtraInfo }) => {
      this.userExtraInfo = userExtraInfo;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
