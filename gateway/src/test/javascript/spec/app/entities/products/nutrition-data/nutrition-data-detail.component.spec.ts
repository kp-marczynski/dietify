/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionDataDetailComponent } from 'app/entities/products/nutrition-data/nutrition-data-detail.component';
import { NutritionData } from 'app/shared/model/products/nutrition-data.model';

describe('Component Tests', () => {
  describe('NutritionData Management Detail Component', () => {
    let comp: NutritionDataDetailComponent;
    let fixture: ComponentFixture<NutritionDataDetailComponent>;
    const route = ({ data: of({ nutritionData: new NutritionData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NutritionDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NutritionDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nutritionData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
