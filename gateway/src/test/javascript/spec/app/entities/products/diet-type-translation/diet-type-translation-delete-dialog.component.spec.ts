/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { DietTypeTranslationDeleteDialogComponent } from 'app/entities/products/diet-type-translation/diet-type-translation-delete-dialog.component';
import { DietTypeTranslationService } from 'app/entities/products/diet-type-translation/diet-type-translation.service';

describe('Component Tests', () => {
  describe('DietTypeTranslation Management Delete Component', () => {
    let comp: DietTypeTranslationDeleteDialogComponent;
    let fixture: ComponentFixture<DietTypeTranslationDeleteDialogComponent>;
    let service: DietTypeTranslationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DietTypeTranslationDeleteDialogComponent]
      })
        .overrideTemplate(DietTypeTranslationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DietTypeTranslationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DietTypeTranslationService);
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
