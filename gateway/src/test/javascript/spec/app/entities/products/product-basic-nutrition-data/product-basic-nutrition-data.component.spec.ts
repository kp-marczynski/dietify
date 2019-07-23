/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductBasicNutritionDataComponent } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data.component';
import { ProductBasicNutritionDataService } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data.service';
import { ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('ProductBasicNutritionData Management Component', () => {
    let comp: ProductBasicNutritionDataComponent;
    let fixture: ComponentFixture<ProductBasicNutritionDataComponent>;
    let service: ProductBasicNutritionDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductBasicNutritionDataComponent],
        providers: []
      })
        .overrideTemplate(ProductBasicNutritionDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductBasicNutritionDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductBasicNutritionDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductBasicNutritionData(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productBasicNutritionData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
