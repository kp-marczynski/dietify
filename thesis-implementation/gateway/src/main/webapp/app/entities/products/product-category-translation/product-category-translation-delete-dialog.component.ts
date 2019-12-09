import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';
import { ProductCategoryTranslationService } from './product-category-translation.service';

@Component({
  selector: 'jhi-product-category-translation-delete-dialog',
  templateUrl: './product-category-translation-delete-dialog.component.html'
})
export class ProductCategoryTranslationDeleteDialogComponent {
  productCategoryTranslation: IProductCategoryTranslation;

  constructor(
    protected productCategoryTranslationService: ProductCategoryTranslationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productCategoryTranslationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'productCategoryTranslationListModification',
        content: 'Deleted an productCategoryTranslation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-product-category-translation-delete-popup',
  template: ''
})
export class ProductCategoryTranslationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productCategoryTranslation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProductCategoryTranslationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.productCategoryTranslation = productCategoryTranslation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/product-category-translation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/product-category-translation', { outlets: { popup: null } }]);
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
