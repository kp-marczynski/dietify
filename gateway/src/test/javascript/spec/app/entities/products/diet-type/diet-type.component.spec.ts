/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DietTypeComponent } from 'app/entities/products/diet-type/diet-type.component';
import { DietTypeService } from 'app/entities/products/diet-type/diet-type.service';
import { DietType } from 'app/shared/model/products/diet-type.model';

describe('Component Tests', () => {
  describe('DietType Management Component', () => {
    let comp: DietTypeComponent;
    let fixture: ComponentFixture<DietTypeComponent>;
    let service: DietTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DietTypeComponent],
        providers: []
      })
        .overrideTemplate(DietTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DietTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DietTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DietType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dietTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
