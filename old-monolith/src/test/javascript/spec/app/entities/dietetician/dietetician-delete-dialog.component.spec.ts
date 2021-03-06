/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { DieteticianDeleteDialogComponent } from 'app/entities/dietetician/dietetician-delete-dialog.component';
import { DieteticianService } from 'app/entities/dietetician/dietetician.service';

describe('Component Tests', () => {
    describe('Dietetician Management Delete Component', () => {
        let comp: DieteticianDeleteDialogComponent;
        let fixture: ComponentFixture<DieteticianDeleteDialogComponent>;
        let service: DieteticianService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [DieteticianDeleteDialogComponent]
            })
                .overrideTemplate(DieteticianDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DieteticianDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DieteticianService);
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
