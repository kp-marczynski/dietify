/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ProductBasicNutritionDataDeleteDialogComponent } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data-delete-dialog.component';
import { ProductBasicNutritionDataService } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data.service';

describe('Component Tests', () => {
  describe('ProductBasicNutritionData Management Delete Component', () => {
    let comp: ProductBasicNutritionDataDeleteDialogComponent;
    let fixture: ComponentFixture<ProductBasicNutritionDataDeleteDialogComponent>;
    let service: ProductBasicNutritionDataService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductBasicNutritionDataDeleteDialogComponent]
      })
        .overrideTemplate(ProductBasicNutritionDataDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductBasicNutritionDataDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductBasicNutritionDataService);
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
