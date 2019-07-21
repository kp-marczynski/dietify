/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductCategoryTranslationDetailComponent } from 'app/entities/products/product-category-translation/product-category-translation-detail.component';
import { ProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

describe('Component Tests', () => {
  describe('ProductCategoryTranslation Management Detail Component', () => {
    let comp: ProductCategoryTranslationDetailComponent;
    let fixture: ComponentFixture<ProductCategoryTranslationDetailComponent>;
    const route = ({ data: of({ productCategoryTranslation: new ProductCategoryTranslation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductCategoryTranslationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductCategoryTranslationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductCategoryTranslationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productCategoryTranslation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
