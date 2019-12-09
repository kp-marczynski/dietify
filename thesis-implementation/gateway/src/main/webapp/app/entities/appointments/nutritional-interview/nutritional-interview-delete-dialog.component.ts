import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { NutritionalInterviewService } from './nutritional-interview.service';

@Component({
  selector: 'jhi-nutritional-interview-delete-dialog',
  templateUrl: './nutritional-interview-delete-dialog.component.html'
})
export class NutritionalInterviewDeleteDialogComponent {
  nutritionalInterview: INutritionalInterview;

  constructor(
    protected nutritionalInterviewService: NutritionalInterviewService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.nutritionalInterviewService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'nutritionalInterviewListModification',
        content: 'Deleted an nutritionalInterview'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nutritional-interview-delete-popup',
  template: ''
})
export class NutritionalInterviewDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionalInterview }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NutritionalInterviewDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.nutritionalInterview = nutritionalInterview;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/nutritional-interview', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/nutritional-interview', { outlets: { popup: null } }]);
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
