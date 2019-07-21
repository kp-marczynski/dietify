import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { NutritionDefinitionTranslationService } from './nutrition-definition-translation.service';

@Component({
  selector: 'jhi-nutrition-definition-translation-delete-dialog',
  templateUrl: './nutrition-definition-translation-delete-dialog.component.html'
})
export class NutritionDefinitionTranslationDeleteDialogComponent {
  nutritionDefinitionTranslation: INutritionDefinitionTranslation;

  constructor(
    protected nutritionDefinitionTranslationService: NutritionDefinitionTranslationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.nutritionDefinitionTranslationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'nutritionDefinitionTranslationListModification',
        content: 'Deleted an nutritionDefinitionTranslation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nutrition-definition-translation-delete-popup',
  template: ''
})
export class NutritionDefinitionTranslationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionDefinitionTranslation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NutritionDefinitionTranslationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.nutritionDefinitionTranslation = nutritionDefinitionTranslation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/nutrition-definition-translation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/nutrition-definition-translation', { outlets: { popup: null } }]);
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
