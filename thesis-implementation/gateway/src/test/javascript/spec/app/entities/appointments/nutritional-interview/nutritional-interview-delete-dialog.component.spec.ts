/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionalInterviewDeleteDialogComponent } from 'app/entities/appointments/nutritional-interview/nutritional-interview-delete-dialog.component';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview/nutritional-interview.service';

describe('Component Tests', () => {
  describe('NutritionalInterview Management Delete Component', () => {
    let comp: NutritionalInterviewDeleteDialogComponent;
    let fixture: ComponentFixture<NutritionalInterviewDeleteDialogComponent>;
    let service: NutritionalInterviewService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionalInterviewDeleteDialogComponent]
      })
        .overrideTemplate(NutritionalInterviewDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NutritionalInterviewDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionalInterviewService);
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
