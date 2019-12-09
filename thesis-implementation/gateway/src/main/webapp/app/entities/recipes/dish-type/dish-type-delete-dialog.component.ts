import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDishType } from 'app/shared/model/recipes/dish-type.model';
import { DishTypeService } from './dish-type.service';

@Component({
  selector: 'jhi-dish-type-delete-dialog',
  templateUrl: './dish-type-delete-dialog.component.html'
})
export class DishTypeDeleteDialogComponent {
  dishType: IDishType;

  constructor(protected dishTypeService: DishTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dishTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dishTypeListModification',
        content: 'Deleted an dishType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dish-type-delete-popup',
  template: ''
})
export class DishTypeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dishType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DishTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dishType = dishType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dish-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dish-type', { outlets: { popup: null } }]);
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
