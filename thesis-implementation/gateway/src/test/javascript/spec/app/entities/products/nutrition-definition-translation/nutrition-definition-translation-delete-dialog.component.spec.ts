/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionDefinitionTranslationDeleteDialogComponent } from 'app/entities/products/nutrition-definition-translation/nutrition-definition-translation-delete-dialog.component';
import { NutritionDefinitionTranslationService } from 'app/entities/products/nutrition-definition-translation/nutrition-definition-translation.service';

describe('Component Tests', () => {
  describe('NutritionDefinitionTranslation Management Delete Component', () => {
    let comp: NutritionDefinitionTranslationDeleteDialogComponent;
    let fixture: ComponentFixture<NutritionDefinitionTranslationDeleteDialogComponent>;
    let service: NutritionDefinitionTranslationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionDefinitionTranslationDeleteDialogComponent]
      })
        .overrideTemplate(NutritionDefinitionTranslationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NutritionDefinitionTranslationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionDefinitionTranslationService);
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
