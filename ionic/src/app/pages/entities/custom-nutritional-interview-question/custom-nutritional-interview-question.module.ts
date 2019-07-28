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

import { CustomNutritionalInterviewQuestionPage } from './custom-nutritional-interview-question';
import { CustomNutritionalInterviewQuestionUpdatePage } from './custom-nutritional-interview-question-update';
import { CustomNutritionalInterviewQuestion, CustomNutritionalInterviewQuestionService, CustomNutritionalInterviewQuestionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class CustomNutritionalInterviewQuestionResolve implements Resolve<CustomNutritionalInterviewQuestion> {
  constructor(private service: CustomNutritionalInterviewQuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomNutritionalInterviewQuestion> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomNutritionalInterviewQuestion>) => response.ok),
        map((customNutritionalInterviewQuestion: HttpResponse<CustomNutritionalInterviewQuestion>) => customNutritionalInterviewQuestion.body)
      );
    }
    return of(new CustomNutritionalInterviewQuestion());
  }
}

const routes: Routes = [
    {
      path: '',
      component: CustomNutritionalInterviewQuestionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: CustomNutritionalInterviewQuestionUpdatePage,
      resolve: {
        data: CustomNutritionalInterviewQuestionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: CustomNutritionalInterviewQuestionDetailPage,
      resolve: {
        data: CustomNutritionalInterviewQuestionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: CustomNutritionalInterviewQuestionUpdatePage,
      resolve: {
        data: CustomNutritionalInterviewQuestionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        CustomNutritionalInterviewQuestionPage,
        CustomNutritionalInterviewQuestionUpdatePage,
        CustomNutritionalInterviewQuestionDetailPage
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
export class CustomNutritionalInterviewQuestionPageModule {
}
