/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { NutritionDefinitionDeleteDialogComponent } from 'app/entities/nutrition-definition/nutrition-definition-delete-dialog.component';
import { NutritionDefinitionService } from 'app/entities/nutrition-definition/nutrition-definition.service';

describe('Component Tests', () => {
    describe('NutritionDefinition Management Delete Component', () => {
        let comp: NutritionDefinitionDeleteDialogComponent;
        let fixture: ComponentFixture<NutritionDefinitionDeleteDialogComponent>;
        let service: NutritionDefinitionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [NutritionDefinitionDeleteDialogComponent]
            })
                .overrideTemplate(NutritionDefinitionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NutritionDefinitionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NutritionDefinitionService);
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
