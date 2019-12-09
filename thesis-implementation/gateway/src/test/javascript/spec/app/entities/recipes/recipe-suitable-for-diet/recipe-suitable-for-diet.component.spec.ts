/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeSuitableForDietComponent } from 'app/entities/recipes/recipe-suitable-for-diet/recipe-suitable-for-diet.component';
import { RecipeSuitableForDietService } from 'app/entities/recipes/recipe-suitable-for-diet/recipe-suitable-for-diet.service';
import { RecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';

describe('Component Tests', () => {
  describe('RecipeSuitableForDiet Management Component', () => {
    let comp: RecipeSuitableForDietComponent;
    let fixture: ComponentFixture<RecipeSuitableForDietComponent>;
    let service: RecipeSuitableForDietService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeSuitableForDietComponent],
        providers: []
      })
        .overrideTemplate(RecipeSuitableForDietComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeSuitableForDietComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeSuitableForDietService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RecipeSuitableForDiet(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recipeSuitableForDiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
