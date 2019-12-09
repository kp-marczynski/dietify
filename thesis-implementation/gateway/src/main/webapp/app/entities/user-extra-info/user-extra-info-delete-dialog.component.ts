import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserExtraInfo } from 'app/shared/model/user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';

@Component({
  selector: 'jhi-user-extra-info-delete-dialog',
  templateUrl: './user-extra-info-delete-dialog.component.html'
})
export class UserExtraInfoDeleteDialogComponent {
  userExtraInfo: IUserExtraInfo;

  constructor(
    protected userExtraInfoService: UserExtraInfoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userExtraInfoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userExtraInfoListModification',
        content: 'Deleted an userExtraInfo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-extra-info-delete-popup',
  template: ''
})
export class UserExtraInfoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userExtraInfo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserExtraInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userExtraInfo = userExtraInfo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-extra-info', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-extra-info', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
