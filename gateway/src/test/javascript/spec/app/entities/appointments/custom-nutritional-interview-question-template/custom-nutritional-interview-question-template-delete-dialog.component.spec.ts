/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent } from 'app/entities/appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template-delete-dialog.component';
import { CustomNutritionalInterviewQuestionTemplateService } from 'app/entities/appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template.service';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestionTemplate Management Delete Component', () => {
    let comp: CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent>;
    let service: CustomNutritionalInterviewQuestionTemplateService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent]
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomNutritionalInterviewQuestionTemplateService);
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
