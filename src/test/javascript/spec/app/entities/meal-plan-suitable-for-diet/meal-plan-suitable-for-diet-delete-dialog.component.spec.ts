/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanSuitableForDietDeleteDialogComponent } from 'app/entities/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet-delete-dialog.component';
import { MealPlanSuitableForDietService } from 'app/entities/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.service';

describe('Component Tests', () => {
    describe('MealPlanSuitableForDiet Management Delete Component', () => {
        let comp: MealPlanSuitableForDietDeleteDialogComponent;
        let fixture: ComponentFixture<MealPlanSuitableForDietDeleteDialogComponent>;
        let service: MealPlanSuitableForDietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanSuitableForDietDeleteDialogComponent]
            })
                .overrideTemplate(MealPlanSuitableForDietDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealPlanSuitableForDietDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealPlanSuitableForDietService);
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
