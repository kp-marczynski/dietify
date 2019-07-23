/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeBasicNutritionDataDeleteDialogComponent } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data-delete-dialog.component';
import { RecipeBasicNutritionDataService } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data.service';

describe('Component Tests', () => {
  describe('RecipeBasicNutritionData Management Delete Component', () => {
    let comp: RecipeBasicNutritionDataDeleteDialogComponent;
    let fixture: ComponentFixture<RecipeBasicNutritionDataDeleteDialogComponent>;
    let service: RecipeBasicNutritionDataService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeBasicNutritionDataDeleteDialogComponent]
      })
        .overrideTemplate(RecipeBasicNutritionDataDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeBasicNutritionDataDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeBasicNutritionDataService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
