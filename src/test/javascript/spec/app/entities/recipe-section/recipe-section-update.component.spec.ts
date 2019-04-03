/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { RecipeSectionUpdateComponent } from 'app/entities/recipe-section/recipe-section-update.component';
import { RecipeSectionService } from 'app/entities/recipe-section/recipe-section.service';
import { RecipeSection } from 'app/shared/model/recipe-section.model';

describe('Component Tests', () => {
    describe('RecipeSection Management Update Component', () => {
        let comp: RecipeSectionUpdateComponent;
        let fixture: ComponentFixture<RecipeSectionUpdateComponent>;
        let service: RecipeSectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [RecipeSectionUpdateComponent]
            })
                .overrideTemplate(RecipeSectionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecipeSectionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecipeSectionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RecipeSection(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.recipeSection = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RecipeSection();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.recipeSection = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
