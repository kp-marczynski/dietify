import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { ProductSubcategoryService } from './product-subcategory.service';

@Component({
  selector: 'jhi-product-subcategory-delete-dialog',
  templateUrl: './product-subcategory-delete-dialog.component.html'
})
export class ProductSubcategoryDeleteDialogComponent {
  productSubcategory: IProductSubcategory;

  constructor(
    protected productSubcategoryService: ProductSubcategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productSubcategoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'productSubcategoryListModification',
        content: 'Deleted an productSubcategory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-product-subcategory-delete-popup',
  template: ''
})
export class ProductSubcategoryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productSubcategory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProductSubcategoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.productSubcategory = productSubcategory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/product-subcategory', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/product-subcategory', { outlets: { popup: null } }]);
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
