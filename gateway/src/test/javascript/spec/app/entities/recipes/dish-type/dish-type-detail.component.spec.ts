/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DishTypeDetailComponent } from 'app/entities/recipes/dish-type/dish-type-detail.component';
import { DishType } from 'app/shared/model/recipes/dish-type.model';

describe('Component Tests', () => {
  describe('DishType Management Detail Component', () => {
    let comp: DishTypeDetailComponent;
    let fixture: ComponentFixture<DishTypeDetailComponent>;
    const route = ({ data: of({ dishType: new DishType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DishTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DishTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DishTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dishType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
