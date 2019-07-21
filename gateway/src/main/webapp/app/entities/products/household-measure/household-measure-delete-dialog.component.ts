import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHouseholdMeasure } from 'app/shared/model/products/household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';

@Component({
  selector: 'jhi-household-measure-delete-dialog',
  templateUrl: './household-measure-delete-dialog.component.html'
})
export class HouseholdMeasureDeleteDialogComponent {
  householdMeasure: IHouseholdMeasure;

  constructor(
    protected householdMeasureService: HouseholdMeasureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.householdMeasureService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'householdMeasureListModification',
        content: 'Deleted an householdMeasure'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-household-measure-delete-popup',
  template: ''
})
export class HouseholdMeasureDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ householdMeasure }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HouseholdMeasureDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.householdMeasure = householdMeasure;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/household-measure', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/household-measure', { outlets: { popup: null } }]);
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
