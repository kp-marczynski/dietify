/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { KitchenApplianceTranslationComponent } from 'app/entities/recipes/kitchen-appliance-translation/kitchen-appliance-translation.component';
import { KitchenApplianceTranslationService } from 'app/entities/recipes/kitchen-appliance-translation/kitchen-appliance-translation.service';
import { KitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

describe('Component Tests', () => {
  describe('KitchenApplianceTranslation Management Component', () => {
    let comp: KitchenApplianceTranslationComponent;
    let fixture: ComponentFixture<KitchenApplianceTranslationComponent>;
    let service: KitchenApplianceTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [KitchenApplianceTranslationComponent],
        providers: []
      })
        .overrideTemplate(KitchenApplianceTranslationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KitchenApplianceTranslationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KitchenApplianceTranslationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new KitchenApplianceTranslation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.kitchenApplianceTranslations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
