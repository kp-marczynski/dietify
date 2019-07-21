/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { MealProductComponent } from 'app/entities/mealplans/meal-product/meal-product.component';
import { MealProductService } from 'app/entities/mealplans/meal-product/meal-product.service';
import { MealProduct } from 'app/shared/model/mealplans/meal-product.model';

describe('Component Tests', () => {
  describe('MealProduct Management Component', () => {
    let comp: MealProductComponent;
    let fixture: ComponentFixture<MealProductComponent>;
    let service: MealProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealProductComponent],
        providers: []
      })
        .overrideTemplate(MealProductComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealProductComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealProductService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MealProduct(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mealProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
