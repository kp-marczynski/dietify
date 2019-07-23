import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';
import { CustomNutritionalInterviewQuestionTemplateComponent } from './custom-nutritional-interview-question-template.component';
import { CustomNutritionalInterviewQuestionTemplateDetailComponent } from './custom-nutritional-interview-question-template-detail.component';
import { CustomNutritionalInterviewQuestionTemplateUpdateComponent } from './custom-nutritional-interview-question-template-update.component';
import { CustomNutritionalInterviewQuestionTemplateDeletePopupComponent } from './custom-nutritional-interview-question-template-delete-dialog.component';
import { ICustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';

@Injectable({ providedIn: 'root' })
export class CustomNutritionalInterviewQuestionTemplateResolve implements Resolve<ICustomNutritionalInterviewQuestionTemplate> {
  constructor(private service: CustomNutritionalInterviewQuestionTemplateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomNutritionalInterviewQuestionTemplate> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomNutritionalInterviewQuestionTemplate>) => response.ok),
        map(
          (customNutritionalInterviewQuestionTemplate: HttpResponse<CustomNutritionalInterviewQuestionTemplate>) =>
            customNutritionalInterviewQuestionTemplate.body
        )
      );
    }
    return of(new CustomNutritionalInterviewQuestionTemplate());
  }
}

export const customNutritionalInterviewQuestionTemplateRoute: Routes = [
  {
    path: '',
    component: CustomNutritionalInterviewQuestionTemplateComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CustomNutritionalInterviewQuestionTemplateDetailComponent,
    resolve: {
      customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CustomNutritionalInterviewQuestionTemplateUpdateComponent,
    resolve: {
      customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CustomNutritionalInterviewQuestionTemplateUpdateComponent,
    resolve: {
      customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const customNutritionalInterviewQuestionTemplatePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CustomNutritionalInterviewQuestionTemplateDeletePopupComponent,
    resolve: {
      customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
