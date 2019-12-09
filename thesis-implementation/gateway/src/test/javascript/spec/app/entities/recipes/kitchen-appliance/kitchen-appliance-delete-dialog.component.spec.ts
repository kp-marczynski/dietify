/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { KitchenApplianceDeleteDialogComponent } from 'app/entities/recipes/kitchen-appliance/kitchen-appliance-delete-dialog.component';
import { KitchenApplianceService } from 'app/entities/recipes/kitchen-appliance/kitchen-appliance.service';

describe('Component Tests', () => {
  describe('KitchenAppliance Management Delete Component', () => {
    let comp: KitchenApplianceDeleteDialogComponent;
    let fixture: ComponentFixture<KitchenApplianceDeleteDialogComponent>;
    let service: KitchenApplianceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [KitchenApplianceDeleteDialogComponent]
      })
        .overrideTemplate(KitchenApplianceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KitchenApplianceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KitchenApplianceService);
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
