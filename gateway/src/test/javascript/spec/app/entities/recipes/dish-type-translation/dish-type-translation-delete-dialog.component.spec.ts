/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { DishTypeTranslationDeleteDialogComponent } from 'app/entities/recipes/dish-type-translation/dish-type-translation-delete-dialog.component';
import { DishTypeTranslationService } from 'app/entities/recipes/dish-type-translation/dish-type-translation.service';

describe('Component Tests', () => {
  describe('DishTypeTranslation Management Delete Component', () => {
    let comp: DishTypeTranslationDeleteDialogComponent;
    let fixture: ComponentFixture<DishTypeTranslationDeleteDialogComponent>;
    let service: DishTypeTranslationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DishTypeTranslationDeleteDialogComponent]
      })
        .overrideTemplate(DishTypeTranslationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DishTypeTranslationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DishTypeTranslationService);
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
