/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { ProductPortionDetailComponent } from 'app/entities/product-portion/product-portion-detail.component';
import { ProductPortion } from 'app/shared/model/product-portion.model';

describe('Component Tests', () => {
    describe('ProductPortion Management Detail Component', () => {
        let comp: ProductPortionDetailComponent;
        let fixture: ComponentFixture<ProductPortionDetailComponent>;
        const route = ({ data: of({ productPortion: new ProductPortion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [ProductPortionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductPortionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductPortionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productPortion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
