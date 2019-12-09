/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { KitchenApplianceTranslationDetailComponent } from 'app/entities/recipes/kitchen-appliance-translation/kitchen-appliance-translation-detail.component';
import { KitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

describe('Component Tests', () => {
  describe('KitchenApplianceTranslation Management Detail Component', () => {
    let comp: KitchenApplianceTranslationDetailComponent;
    let fixture: ComponentFixture<KitchenApplianceTranslationDetailComponent>;
    const route = ({ data: of({ kitchenApplianceTranslation: new KitchenApplianceTranslation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [KitchenApplianceTranslationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KitchenApplianceTranslationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KitchenApplianceTranslationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.kitchenApplianceTranslation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
