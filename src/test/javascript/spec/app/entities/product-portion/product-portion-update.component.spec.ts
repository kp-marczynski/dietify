/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { ProductPortionUpdateComponent } from 'app/entities/product-portion/product-portion-update.component';
import { ProductPortionService } from 'app/entities/product-portion/product-portion.service';
import { ProductPortion } from 'app/shared/model/product-portion.model';

describe('Component Tests', () => {
    describe('ProductPortion Management Update Component', () => {
        let comp: ProductPortionUpdateComponent;
        let fixture: ComponentFixture<ProductPortionUpdateComponent>;
        let service: ProductPortionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [ProductPortionUpdateComponent]
            })
                .overrideTemplate(ProductPortionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductPortionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductPortionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductPortion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productPortion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductPortion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productPortion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
