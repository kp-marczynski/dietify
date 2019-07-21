/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeSectionDetailComponent } from 'app/entities/recipes/recipe-section/recipe-section-detail.component';
import { RecipeSection } from 'app/shared/model/recipes/recipe-section.model';

describe('Component Tests', () => {
  describe('RecipeSection Management Detail Component', () => {
    let comp: RecipeSectionDetailComponent;
    let fixture: ComponentFixture<RecipeSectionDetailComponent>;
    const route = ({ data: of({ recipeSection: new RecipeSection(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeSectionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RecipeSectionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeSectionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recipeSection).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
