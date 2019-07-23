/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeBasicNutritionDataComponent } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data.component';
import { RecipeBasicNutritionDataService } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data.service';
import { RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('RecipeBasicNutritionData Management Component', () => {
    let comp: RecipeBasicNutritionDataComponent;
    let fixture: ComponentFixture<RecipeBasicNutritionDataComponent>;
    let service: RecipeBasicNutritionDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeBasicNutritionDataComponent],
        providers: []
      })
        .overrideTemplate(RecipeBasicNutritionDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeBasicNutritionDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeBasicNutritionDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RecipeBasicNutritionData(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recipeBasicNutritionData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
