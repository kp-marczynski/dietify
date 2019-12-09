import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';
import { DietTypeTranslationService } from './diet-type-translation.service';

@Component({
  selector: 'jhi-diet-type-translation-delete-dialog',
  templateUrl: './diet-type-translation-delete-dialog.component.html'
})
export class DietTypeTranslationDeleteDialogComponent {
  dietTypeTranslation: IDietTypeTranslation;

  constructor(
    protected dietTypeTranslationService: DietTypeTranslationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dietTypeTranslationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dietTypeTranslationListModification',
        content: 'Deleted an dietTypeTranslation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-diet-type-translation-delete-popup',
  template: ''
})
export class DietTypeTranslationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dietTypeTranslation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DietTypeTranslationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.dietTypeTranslation = dietTypeTranslation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/diet-type-translation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/diet-type-translation', { outlets: { popup: null } }]);
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
