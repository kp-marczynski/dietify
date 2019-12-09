/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DishTypeComponent } from 'app/entities/recipes/dish-type/dish-type.component';
import { DishTypeService } from 'app/entities/recipes/dish-type/dish-type.service';
import { DishType } from 'app/shared/model/recipes/dish-type.model';

describe('Component Tests', () => {
  describe('DishType Management Component', () => {
    let comp: DishTypeComponent;
    let fixture: ComponentFixture<DishTypeComponent>;
    let service: DishTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DishTypeComponent],
        providers: []
      })
        .overrideTemplate(DishTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DishTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DishTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DishType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dishTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
