import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';

type EntityResponseType = HttpResponse<ICustomNutritionalInterviewQuestionTemplate>;
type EntityArrayResponseType = HttpResponse<ICustomNutritionalInterviewQuestionTemplate[]>;

@Injectable({ providedIn: 'root' })
export class CustomNutritionalInterviewQuestionTemplateService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/custom-nutritional-interview-question-templates';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/custom-nutritional-interview-question-templates';

  constructor(protected http: HttpClient) {}

  create(customNutritionalInterviewQuestionTemplate: ICustomNutritionalInterviewQuestionTemplate): Observable<EntityResponseType> {
    return this.http.post<ICustomNutritionalInterviewQuestionTemplate>(this.resourceUrl, customNutritionalInterviewQuestionTemplate, {
      observe: 'response'
    });
  }

  update(customNutritionalInterviewQuestionTemplate: ICustomNutritionalInterviewQuestionTemplate): Observable<EntityResponseType> {
    return this.http.put<ICustomNutritionalInterviewQuestionTemplate>(this.resourceUrl, customNutritionalInterviewQuestionTemplate, {
      observe: 'response'
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomNutritionalInterviewQuestionTemplate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomNutritionalInterviewQuestionTemplate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomNutritionalInterviewQuestionTemplate[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
