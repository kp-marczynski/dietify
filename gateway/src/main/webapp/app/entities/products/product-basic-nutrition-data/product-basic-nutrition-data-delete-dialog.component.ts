import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { ProductBasicNutritionDataService } from './product-basic-nutrition-data.service';

@Component({
  selector: 'jhi-product-basic-nutrition-data-delete-dialog',
  templateUrl: './product-basic-nutrition-data-delete-dialog.component.html'
})
export class ProductBasicNutritionDataDeleteDialogComponent {
  productBasicNutritionData: IProductBasicNutritionData;

  constructor(
    protected productBasicNutritionDataService: ProductBasicNutritionDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productBasicNutritionDataService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'productBasicNutritionDataListModification',
        content: 'Deleted an productBasicNutritionData'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-product-basic-nutrition-data-delete-popup',
  template: ''
})
export class ProductBasicNutritionDataDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productBasicNutritionData }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProductBasicNutritionDataDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.productBasicNutritionData = productBasicNutritionData;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/product-basic-nutrition-data', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/product-basic-nutrition-data', { outlets: { popup: null } }]);
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
