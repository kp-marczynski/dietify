import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';
import { AppointmentEvaluationService } from './appointment-evaluation.service';

@Component({
  selector: 'jhi-appointment-evaluation-delete-dialog',
  templateUrl: './appointment-evaluation-delete-dialog.component.html'
})
export class AppointmentEvaluationDeleteDialogComponent {
  appointmentEvaluation: IAppointmentEvaluation;

  constructor(
    protected appointmentEvaluationService: AppointmentEvaluationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appointmentEvaluationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'appointmentEvaluationListModification',
        content: 'Deleted an appointmentEvaluation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-appointment-evaluation-delete-popup',
  template: ''
})
export class AppointmentEvaluationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appointmentEvaluation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AppointmentEvaluationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.appointmentEvaluation = appointmentEvaluation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/appointment-evaluation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/appointment-evaluation', { outlets: { popup: null } }]);
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
