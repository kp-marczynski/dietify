import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDietType } from 'app/shared/model/products/diet-type.model';
import { DietTypeService } from './diet-type.service';

@Component({
  selector: 'jhi-diet-type-delete-dialog',
  templateUrl: './diet-type-delete-dialog.component.html'
})
export class DietTypeDeleteDialogComponent {
  dietType: IDietType;

  constructor(protected dietTypeService: DietTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dietTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dietTypeListModification',
        content: 'Deleted an dietType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-diet-type-delete-popup',
  template: ''
})
export class DietTypeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dietType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DietTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dietType = dietType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/diet-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/diet-type', { outlets: { popup: null } }]);
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
