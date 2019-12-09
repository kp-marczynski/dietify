/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { OwnedKitchenApplianceDeleteDialogComponent } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance-delete-dialog.component';
import { OwnedKitchenApplianceService } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance.service';

describe('Component Tests', () => {
  describe('OwnedKitchenAppliance Management Delete Component', () => {
    let comp: OwnedKitchenApplianceDeleteDialogComponent;
    let fixture: ComponentFixture<OwnedKitchenApplianceDeleteDialogComponent>;
    let service: OwnedKitchenApplianceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OwnedKitchenApplianceDeleteDialogComponent]
      })
        .overrideTemplate(OwnedKitchenApplianceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OwnedKitchenApplianceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OwnedKitchenApplianceService);
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
