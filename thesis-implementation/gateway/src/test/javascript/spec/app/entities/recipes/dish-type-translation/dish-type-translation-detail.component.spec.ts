/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DishTypeTranslationDetailComponent } from 'app/entities/recipes/dish-type-translation/dish-type-translation-detail.component';
import { DishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';

describe('Component Tests', () => {
  describe('DishTypeTranslation Management Detail Component', () => {
    let comp: DishTypeTranslationDetailComponent;
    let fixture: ComponentFixture<DishTypeTranslationDetailComponent>;
    const route = ({ data: of({ dishTypeTranslation: new DishTypeTranslation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DishTypeTranslationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DishTypeTranslationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DishTypeTranslationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dishTypeTranslation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
