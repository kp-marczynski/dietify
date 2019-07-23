/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { UserExtraInfoDeleteDialogComponent } from 'app/entities/user-extra-info/user-extra-info-delete-dialog.component';
import { UserExtraInfoService } from 'app/entities/user-extra-info/user-extra-info.service';

describe('Component Tests', () => {
  describe('UserExtraInfo Management Delete Component', () => {
    let comp: UserExtraInfoDeleteDialogComponent;
    let fixture: ComponentFixture<UserExtraInfoDeleteDialogComponent>;
    let service: UserExtraInfoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserExtraInfoDeleteDialogComponent]
      })
        .overrideTemplate(UserExtraInfoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserExtraInfoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserExtraInfoService);
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
