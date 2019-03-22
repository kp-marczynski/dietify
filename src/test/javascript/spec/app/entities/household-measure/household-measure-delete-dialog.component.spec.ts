/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { HouseholdMeasureDeleteDialogComponent } from 'app/entities/household-measure/household-measure-delete-dialog.component';
import { HouseholdMeasureService } from 'app/entities/household-measure/household-measure.service';

describe('Component Tests', () => {
    describe('HouseholdMeasure Management Delete Component', () => {
        let comp: HouseholdMeasureDeleteDialogComponent;
        let fixture: ComponentFixture<HouseholdMeasureDeleteDialogComponent>;
        let service: HouseholdMeasureService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [HouseholdMeasureDeleteDialogComponent]
            })
                .overrideTemplate(HouseholdMeasureDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseholdMeasureDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseholdMeasureService);
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
