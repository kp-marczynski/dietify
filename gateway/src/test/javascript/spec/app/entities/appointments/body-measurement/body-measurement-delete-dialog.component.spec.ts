/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { BodyMeasurementDeleteDialogComponent } from 'app/entities/appointments/body-measurement/body-measurement-delete-dialog.component';
import { BodyMeasurementService } from 'app/entities/appointments/body-measurement/body-measurement.service';

describe('Component Tests', () => {
  describe('BodyMeasurement Management Delete Component', () => {
    let comp: BodyMeasurementDeleteDialogComponent;
    let fixture: ComponentFixture<BodyMeasurementDeleteDialogComponent>;
    let service: BodyMeasurementService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BodyMeasurementDeleteDialogComponent]
      })
        .overrideTemplate(BodyMeasurementDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BodyMeasurementDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BodyMeasurementService);
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
