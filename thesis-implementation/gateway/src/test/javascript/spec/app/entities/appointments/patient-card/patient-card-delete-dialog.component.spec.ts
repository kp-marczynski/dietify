/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { PatientCardDeleteDialogComponent } from 'app/entities/appointments/patient-card/patient-card-delete-dialog.component';
import { PatientCardService } from 'app/entities/appointments/patient-card/patient-card.service';

describe('Component Tests', () => {
  describe('PatientCard Management Delete Component', () => {
    let comp: PatientCardDeleteDialogComponent;
    let fixture: ComponentFixture<PatientCardDeleteDialogComponent>;
    let service: PatientCardService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PatientCardDeleteDialogComponent]
      })
        .overrideTemplate(PatientCardDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PatientCardDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatientCardService);
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
