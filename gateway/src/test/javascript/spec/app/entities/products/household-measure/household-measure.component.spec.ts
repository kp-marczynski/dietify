/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { HouseholdMeasureComponent } from 'app/entities/products/household-measure/household-measure.component';
import { HouseholdMeasureService } from 'app/entities/products/household-measure/household-measure.service';
import { HouseholdMeasure } from 'app/shared/model/products/household-measure.model';

describe('Component Tests', () => {
  describe('HouseholdMeasure Management Component', () => {
    let comp: HouseholdMeasureComponent;
    let fixture: ComponentFixture<HouseholdMeasureComponent>;
    let service: HouseholdMeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [HouseholdMeasureComponent],
        providers: []
      })
        .overrideTemplate(HouseholdMeasureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HouseholdMeasureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HouseholdMeasureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HouseholdMeasure(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.householdMeasures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
