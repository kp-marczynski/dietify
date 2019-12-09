/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductCategoryTranslationUpdateComponent } from 'app/entities/products/product-category-translation/product-category-translation-update.component';
import { ProductCategoryTranslationService } from 'app/entities/products/product-category-translation/product-category-translation.service';
import { ProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

describe('Component Tests', () => {
  describe('ProductCategoryTranslation Management Update Component', () => {
    let comp: ProductCategoryTranslationUpdateComponent;
    let fixture: ComponentFixture<ProductCategoryTranslationUpdateComponent>;
    let service: ProductCategoryTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductCategoryTranslationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductCategoryTranslationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCategoryTranslationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCategoryTranslationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductCategoryTranslation(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductCategoryTranslation();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
