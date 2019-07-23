import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';
import { BodyMeasurementService } from './body-measurement.service';

@Component({
  selector: 'jhi-body-measurement-delete-dialog',
  templateUrl: './body-measurement-delete-dialog.component.html'
})
export class BodyMeasurementDeleteDialogComponent {
  bodyMeasurement: IBodyMeasurement;

  constructor(
    protected bodyMeasurementService: BodyMeasurementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bodyMeasurementService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bodyMeasurementListModification',
        content: 'Deleted an bodyMeasurement'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-body-measurement-delete-popup',
  template: ''
})
export class BodyMeasurementDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bodyMeasurement }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BodyMeasurementDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.bodyMeasurement = bodyMeasurement;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/body-measurement', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/body-measurement', { outlets: { popup: null } }]);
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
