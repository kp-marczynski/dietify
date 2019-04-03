/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { RecipeSectionComponent } from 'app/entities/recipe-section/recipe-section.component';
import { RecipeSectionService } from 'app/entities/recipe-section/recipe-section.service';
import { RecipeSection } from 'app/shared/model/recipe-section.model';

describe('Component Tests', () => {
    describe('RecipeSection Management Component', () => {
        let comp: RecipeSectionComponent;
        let fixture: ComponentFixture<RecipeSectionComponent>;
        let service: RecipeSectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [RecipeSectionComponent],
                providers: []
            })
                .overrideTemplate(RecipeSectionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecipeSectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecipeSectionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RecipeSection(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.recipeSections[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
