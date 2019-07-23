/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { ProductSubcategoryDetailComponent } from 'app/entities/product-subcategory/product-subcategory-detail.component';
import { ProductSubcategory } from 'app/shared/model/product-subcategory.model';

describe('Component Tests', () => {
    describe('ProductSubcategory Management Detail Component', () => {
        let comp: ProductSubcategoryDetailComponent;
        let fixture: ComponentFixture<ProductSubcategoryDetailComponent>;
        const route = ({ data: of({ productSubcategory: new ProductSubcategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [ProductSubcategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductSubcategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductSubcategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productSubcategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
