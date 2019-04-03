/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { ProductPortionDeleteDialogComponent } from 'app/entities/product-portion/product-portion-delete-dialog.component';
import { ProductPortionService } from 'app/entities/product-portion/product-portion.service';

describe('Component Tests', () => {
    describe('ProductPortion Management Delete Component', () => {
        let comp: ProductPortionDeleteDialogComponent;
        let fixture: ComponentFixture<ProductPortionDeleteDialogComponent>;
        let service: ProductPortionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [ProductPortionDeleteDialogComponent]
            })
                .overrideTemplate(ProductPortionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductPortionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductPortionService);
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
