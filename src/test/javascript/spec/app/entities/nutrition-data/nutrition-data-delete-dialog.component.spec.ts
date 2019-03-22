/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { NutritionDataDeleteDialogComponent } from 'app/entities/nutrition-data/nutrition-data-delete-dialog.component';
import { NutritionDataService } from 'app/entities/nutrition-data/nutrition-data.service';

describe('Component Tests', () => {
    describe('NutritionData Management Delete Component', () => {
        let comp: NutritionDataDeleteDialogComponent;
        let fixture: ComponentFixture<NutritionDataDeleteDialogComponent>;
        let service: NutritionDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [NutritionDataDeleteDialogComponent]
            })
                .overrideTemplate(NutritionDataDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NutritionDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NutritionDataService);
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
