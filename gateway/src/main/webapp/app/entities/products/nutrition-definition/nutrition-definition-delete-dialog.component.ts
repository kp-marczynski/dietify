import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { NutritionDefinitionService } from './nutrition-definition.service';

@Component({
  selector: 'jhi-nutrition-definition-delete-dialog',
  templateUrl: './nutrition-definition-delete-dialog.component.html'
})
export class NutritionDefinitionDeleteDialogComponent {
  nutritionDefinition: INutritionDefinition;

  constructor(
    protected nutritionDefinitionService: NutritionDefinitionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.nutritionDefinitionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'nutritionDefinitionListModification',
        content: 'Deleted an nutritionDefinition'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nutrition-definition-delete-popup',
  template: ''
})
export class NutritionDefinitionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionDefinition }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NutritionDefinitionDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.nutritionDefinition = nutritionDefinition;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/nutrition-definition', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/nutrition-definition', { outlets: { popup: null } }]);
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
