import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealDefinition } from 'app/shared/model/mealplans/meal-definition.model';
import { MealDefinitionService } from './meal-definition.service';

@Component({
  selector: 'jhi-meal-definition-delete-dialog',
  templateUrl: './meal-definition-delete-dialog.component.html'
})
export class MealDefinitionDeleteDialogComponent {
  mealDefinition: IMealDefinition;

  constructor(
    protected mealDefinitionService: MealDefinitionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealDefinitionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mealDefinitionListModification',
        content: 'Deleted an mealDefinition'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meal-definition-delete-popup',
  template: ''
})
export class MealDefinitionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealDefinition }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MealDefinitionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mealDefinition = mealDefinition;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meal-definition', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meal-definition', { outlets: { popup: null } }]);
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
