/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanUnsuitableForDietDeleteDialogComponent } from 'app/entities/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet-delete-dialog.component';
import { MealPlanUnsuitableForDietService } from 'app/entities/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.service';

describe('Component Tests', () => {
    describe('MealPlanUnsuitableForDiet Management Delete Component', () => {
        let comp: MealPlanUnsuitableForDietDeleteDialogComponent;
        let fixture: ComponentFixture<MealPlanUnsuitableForDietDeleteDialogComponent>;
        let service: MealPlanUnsuitableForDietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanUnsuitableForDietDeleteDialogComponent]
            })
                .overrideTemplate(MealPlanUnsuitableForDietDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealPlanUnsuitableForDietDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealPlanUnsuitableForDietService);
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
