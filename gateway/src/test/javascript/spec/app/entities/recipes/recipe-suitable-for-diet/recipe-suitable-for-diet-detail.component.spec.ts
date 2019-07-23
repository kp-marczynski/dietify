/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeSuitableForDietDetailComponent } from 'app/entities/recipes/recipe-suitable-for-diet/recipe-suitable-for-diet-detail.component';
import { RecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';

describe('Component Tests', () => {
  describe('RecipeSuitableForDiet Management Detail Component', () => {
    let comp: RecipeSuitableForDietDetailComponent;
    let fixture: ComponentFixture<RecipeSuitableForDietDetailComponent>;
    const route = ({ data: of({ recipeSuitableForDiet: new RecipeSuitableForDiet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeSuitableForDietDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RecipeSuitableForDietDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeSuitableForDietDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recipeSuitableForDiet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
