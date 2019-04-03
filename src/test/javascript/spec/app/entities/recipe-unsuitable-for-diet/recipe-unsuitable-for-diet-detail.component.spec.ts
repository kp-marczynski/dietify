/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { RecipeUnsuitableForDietDetailComponent } from 'app/entities/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet-detail.component';
import { RecipeUnsuitableForDiet } from 'app/shared/model/recipe-unsuitable-for-diet.model';

describe('Component Tests', () => {
    describe('RecipeUnsuitableForDiet Management Detail Component', () => {
        let comp: RecipeUnsuitableForDietDetailComponent;
        let fixture: ComponentFixture<RecipeUnsuitableForDietDetailComponent>;
        const route = ({ data: of({ recipeUnsuitableForDiet: new RecipeUnsuitableForDiet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [RecipeUnsuitableForDietDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RecipeUnsuitableForDietDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RecipeUnsuitableForDietDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.recipeUnsuitableForDiet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
