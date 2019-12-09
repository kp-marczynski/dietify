/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSubcategoryDeleteDialogComponent } from 'app/entities/products/product-subcategory/product-subcategory-delete-dialog.component';
import { ProductSubcategoryService } from 'app/entities/products/product-subcategory/product-subcategory.service';

describe('Component Tests', () => {
  describe('ProductSubcategory Management Delete Component', () => {
    let comp: ProductSubcategoryDeleteDialogComponent;
    let fixture: ComponentFixture<ProductSubcategoryDeleteDialogComponent>;
    let service: ProductSubcategoryService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSubcategoryDeleteDialogComponent]
      })
        .overrideTemplate(ProductSubcategoryDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductSubcategoryDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductSubcategoryService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
