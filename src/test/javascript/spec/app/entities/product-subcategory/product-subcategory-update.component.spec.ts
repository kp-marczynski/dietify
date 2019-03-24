/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { ProductSubcategoryUpdateComponent } from 'app/entities/product-subcategory/product-subcategory-update.component';
import { ProductSubcategoryService } from 'app/entities/product-subcategory/product-subcategory.service';
import { ProductSubcategory } from 'app/shared/model/product-subcategory.model';

describe('Component Tests', () => {
    describe('ProductSubcategory Management Update Component', () => {
        let comp: ProductSubcategoryUpdateComponent;
        let fixture: ComponentFixture<ProductSubcategoryUpdateComponent>;
        let service: ProductSubcategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [ProductSubcategoryUpdateComponent]
            })
                .overrideTemplate(ProductSubcategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductSubcategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductSubcategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductSubcategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productSubcategory = entity;
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
                    const entity = new ProductSubcategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productSubcategory = entity;
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
