/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { BodyMeasurmentDeleteDialogComponent } from 'app/entities/body-measurment/body-measurment-delete-dialog.component';
import { BodyMeasurmentService } from 'app/entities/body-measurment/body-measurment.service';

describe('Component Tests', () => {
    describe('BodyMeasurment Management Delete Component', () => {
        let comp: BodyMeasurmentDeleteDialogComponent;
        let fixture: ComponentFixture<BodyMeasurmentDeleteDialogComponent>;
        let service: BodyMeasurmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [BodyMeasurmentDeleteDialogComponent]
            })
                .overrideTemplate(BodyMeasurmentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BodyMeasurmentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyMeasurmentService);
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
