/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DietTypeTranslationDetailComponent } from 'app/entities/products/diet-type-translation/diet-type-translation-detail.component';
import { DietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

describe('Component Tests', () => {
  describe('DietTypeTranslation Management Detail Component', () => {
    let comp: DietTypeTranslationDetailComponent;
    let fixture: ComponentFixture<DietTypeTranslationDetailComponent>;
    const route = ({ data: of({ dietTypeTranslation: new DietTypeTranslation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DietTypeTranslationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DietTypeTranslationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DietTypeTranslationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dietTypeTranslation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
