/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { MealProductDetailComponent } from 'app/entities/meal-product/meal-product-detail.component';
import { MealProduct } from 'app/shared/model/meal-product.model';

describe('Component Tests', () => {
    describe('MealProduct Management Detail Component', () => {
        let comp: MealProductDetailComponent;
        let fixture: ComponentFixture<MealProductDetailComponent>;
        const route = ({ data: of({ mealProduct: new MealProduct(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealProductDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealProductDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealProductDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealProduct).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
