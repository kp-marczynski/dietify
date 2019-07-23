import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';
import { DishTypeTranslationService } from './dish-type-translation.service';

@Component({
  selector: 'jhi-dish-type-translation-delete-dialog',
  templateUrl: './dish-type-translation-delete-dialog.component.html'
})
export class DishTypeTranslationDeleteDialogComponent {
  dishTypeTranslation: IDishTypeTranslation;

  constructor(
    protected dishTypeTranslationService: DishTypeTranslationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dishTypeTranslationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dishTypeTranslationListModification',
        content: 'Deleted an dishTypeTranslation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dish-type-translation-delete-popup',
  template: ''
})
export class DishTypeTranslationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dishTypeTranslation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DishTypeTranslationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.dishTypeTranslation = dishTypeTranslation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dish-type-translation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dish-type-translation', { outlets: { popup: null } }]);
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
