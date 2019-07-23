/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductPortionComponent } from 'app/entities/recipes/product-portion/product-portion.component';
import { ProductPortionService } from 'app/entities/recipes/product-portion/product-portion.service';
import { ProductPortion } from 'app/shared/model/recipes/product-portion.model';

describe('Component Tests', () => {
  describe('ProductPortion Management Component', () => {
    let comp: ProductPortionComponent;
    let fixture: ComponentFixture<ProductPortionComponent>;
    let service: ProductPortionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductPortionComponent],
        providers: []
      })
        .overrideTemplate(ProductPortionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductPortionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductPortionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductPortion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productPortions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
