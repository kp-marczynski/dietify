/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanDayDeleteDialogComponent } from 'app/entities/mealplans/meal-plan-day/meal-plan-day-delete-dialog.component';
import { MealPlanDayService } from 'app/entities/mealplans/meal-plan-day/meal-plan-day.service';

describe('Component Tests', () => {
  describe('MealPlanDay Management Delete Component', () => {
    let comp: MealPlanDayDeleteDialogComponent;
    let fixture: ComponentFixture<MealPlanDayDeleteDialogComponent>;
    let service: MealPlanDayService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanDayDeleteDialogComponent]
      })
        .overrideTemplate(MealPlanDayDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealPlanDayDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealPlanDayService);
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
