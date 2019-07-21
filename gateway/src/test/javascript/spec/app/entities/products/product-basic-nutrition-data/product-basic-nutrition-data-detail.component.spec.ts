/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductBasicNutritionDataDetailComponent } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data-detail.component';
import { ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('ProductBasicNutritionData Management Detail Component', () => {
    let comp: ProductBasicNutritionDataDetailComponent;
    let fixture: ComponentFixture<ProductBasicNutritionDataDetailComponent>;
    const route = ({ data: of({ productBasicNutritionData: new ProductBasicNutritionData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductBasicNutritionDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductBasicNutritionDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductBasicNutritionDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productBasicNutritionData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
