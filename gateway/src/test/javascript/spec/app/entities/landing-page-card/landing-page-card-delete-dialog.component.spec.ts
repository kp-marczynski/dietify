/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { LandingPageCardDeleteDialogComponent } from 'app/entities/landing-page-card/landing-page-card-delete-dialog.component';
import { LandingPageCardService } from 'app/entities/landing-page-card/landing-page-card.service';

describe('Component Tests', () => {
  describe('LandingPageCard Management Delete Component', () => {
    let comp: LandingPageCardDeleteDialogComponent;
    let fixture: ComponentFixture<LandingPageCardDeleteDialogComponent>;
    let service: LandingPageCardService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LandingPageCardDeleteDialogComponent]
      })
        .overrideTemplate(LandingPageCardDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LandingPageCardDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LandingPageCardService);
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
