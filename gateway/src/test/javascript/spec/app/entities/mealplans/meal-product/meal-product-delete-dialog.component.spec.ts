/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MealProductDeleteDialogComponent } from 'app/entities/mealplans/meal-product/meal-product-delete-dialog.component';
import { MealProductService } from 'app/entities/mealplans/meal-product/meal-product.service';

describe('Component Tests', () => {
  describe('MealProduct Management Delete Component', () => {
    let comp: MealProductDeleteDialogComponent;
    let fixture: ComponentFixture<MealProductDeleteDialogComponent>;
    let service: MealProductService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealProductDeleteDialogComponent]
      })
        .overrideTemplate(MealProductDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealProductDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealProductService);
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
