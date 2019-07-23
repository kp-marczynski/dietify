import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';
import { MealTypeTranslationService } from './meal-type-translation.service';

@Component({
  selector: 'jhi-meal-type-translation-delete-dialog',
  templateUrl: './meal-type-translation-delete-dialog.component.html'
})
export class MealTypeTranslationDeleteDialogComponent {
  mealTypeTranslation: IMealTypeTranslation;

  constructor(
    protected mealTypeTranslationService: MealTypeTranslationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealTypeTranslationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mealTypeTranslationListModification',
        content: 'Deleted an mealTypeTranslation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meal-type-translation-delete-popup',
  template: ''
})
export class MealTypeTranslationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealTypeTranslation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MealTypeTranslationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.mealTypeTranslation = mealTypeTranslation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meal-type-translation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meal-type-translation', { outlets: { popup: null } }]);
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
