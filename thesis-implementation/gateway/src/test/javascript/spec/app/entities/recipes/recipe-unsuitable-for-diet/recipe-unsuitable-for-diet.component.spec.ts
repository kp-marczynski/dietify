/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeUnsuitableForDietComponent } from 'app/entities/recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.component';
import { RecipeUnsuitableForDietService } from 'app/entities/recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.service';
import { RecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';

describe('Component Tests', () => {
  describe('RecipeUnsuitableForDiet Management Component', () => {
    let comp: RecipeUnsuitableForDietComponent;
    let fixture: ComponentFixture<RecipeUnsuitableForDietComponent>;
    let service: RecipeUnsuitableForDietService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeUnsuitableForDietComponent],
        providers: []
      })
        .overrideTemplate(RecipeUnsuitableForDietComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeUnsuitableForDietComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeUnsuitableForDietService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RecipeUnsuitableForDiet(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recipeUnsuitableForDiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
