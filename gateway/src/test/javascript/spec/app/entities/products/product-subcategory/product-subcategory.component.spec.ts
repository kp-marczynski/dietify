/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSubcategoryComponent } from 'app/entities/products/product-subcategory/product-subcategory.component';
import { ProductSubcategoryService } from 'app/entities/products/product-subcategory/product-subcategory.service';
import { ProductSubcategory } from 'app/shared/model/products/product-subcategory.model';

describe('Component Tests', () => {
  describe('ProductSubcategory Management Component', () => {
    let comp: ProductSubcategoryComponent;
    let fixture: ComponentFixture<ProductSubcategoryComponent>;
    let service: ProductSubcategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSubcategoryComponent],
        providers: []
      })
        .overrideTemplate(ProductSubcategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductSubcategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductSubcategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductSubcategory(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productSubcategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
