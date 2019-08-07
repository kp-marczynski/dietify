import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { CustomNutritionalInterviewQuestionTemplatePage } from './custom-nutritional-interview-question-template';
import { CustomNutritionalInterviewQuestionTemplateUpdatePage } from './custom-nutritional-interview-question-template-update';
import { CustomNutritionalInterviewQuestionTemplate, CustomNutritionalInterviewQuestionTemplateService, CustomNutritionalInterviewQuestionTemplateDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class CustomNutritionalInterviewQuestionTemplateResolve implements Resolve<CustomNutritionalInterviewQuestionTemplate> {
  constructor(private service: CustomNutritionalInterviewQuestionTemplateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomNutritionalInterviewQuestionTemplate> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomNutritionalInterviewQuestionTemplate>) => response.ok),
        map((customNutritionalInterviewQuestionTemplate: HttpResponse<CustomNutritionalInterviewQuestionTemplate>) => customNutritionalInterviewQuestionTemplate.body)
      );
    }
    return of(new CustomNutritionalInterviewQuestionTemplate());
  }
}

const routes: Routes = [
    {
      path: '',
      component: CustomNutritionalInterviewQuestionTemplatePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: CustomNutritionalInterviewQuestionTemplateUpdatePage,
      resolve: {
        data: CustomNutritionalInterviewQuestionTemplateResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: CustomNutritionalInterviewQuestionTemplateDetailPage,
      resolve: {
        data: CustomNutritionalInterviewQuestionTemplateResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: CustomNutritionalInterviewQuestionTemplateUpdatePage,
      resolve: {
        data: CustomNutritionalInterviewQuestionTemplateResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        CustomNutritionalInterviewQuestionTemplatePage,
        CustomNutritionalInterviewQuestionTemplateUpdatePage,
        CustomNutritionalInterviewQuestionTemplateDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ]
})
export class CustomNutritionalInterviewQuestionTemplatePageModule {
}
