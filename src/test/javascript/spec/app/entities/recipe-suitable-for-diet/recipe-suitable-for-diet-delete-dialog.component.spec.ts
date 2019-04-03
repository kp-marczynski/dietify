/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { RecipeSuitableForDietDeleteDialogComponent } from 'app/entities/recipe-suitable-for-diet/recipe-suitable-for-diet-delete-dialog.component';
import { RecipeSuitableForDietService } from 'app/entities/recipe-suitable-for-diet/recipe-suitable-for-diet.service';

describe('Component Tests', () => {
    describe('RecipeSuitableForDiet Management Delete Component', () => {
        let comp: RecipeSuitableForDietDeleteDialogComponent;
        let fixture: ComponentFixture<RecipeSuitableForDietDeleteDialogComponent>;
        let service: RecipeSuitableForDietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [RecipeSuitableForDietDeleteDialogComponent]
            })
                .overrideTemplate(RecipeSuitableForDietDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RecipeSuitableForDietDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecipeSuitableForDietService);
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
