/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductCategoryTranslationComponent } from 'app/entities/products/product-category-translation/product-category-translation.component';
import { ProductCategoryTranslationService } from 'app/entities/products/product-category-translation/product-category-translation.service';
import { ProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

describe('Component Tests', () => {
  describe('ProductCategoryTranslation Management Component', () => {
    let comp: ProductCategoryTranslationComponent;
    let fixture: ComponentFixture<ProductCategoryTranslationComponent>;
    let service: ProductCategoryTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductCategoryTranslationComponent],
        providers: []
      })
        .overrideTemplate(ProductCategoryTranslationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCategoryTranslationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCategoryTranslationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductCategoryTranslation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productCategoryTranslations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
