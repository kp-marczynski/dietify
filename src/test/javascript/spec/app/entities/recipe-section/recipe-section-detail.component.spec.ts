/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { RecipeSectionDetailComponent } from 'app/entities/recipe-section/recipe-section-detail.component';
import { RecipeSection } from 'app/shared/model/recipe-section.model';

describe('Component Tests', () => {
    describe('RecipeSection Management Detail Component', () => {
        let comp: RecipeSectionDetailComponent;
        let fixture: ComponentFixture<RecipeSectionDetailComponent>;
        const route = ({ data: of({ recipeSection: new RecipeSection(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
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
