import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

type EntityResponseType = HttpResponse<ICustomNutritionalInterviewQuestion>;
type EntityArrayResponseType = HttpResponse<ICustomNutritionalInterviewQuestion[]>;

@Injectable({ providedIn: 'root' })
export class CustomNutritionalInterviewQuestionService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/custom-nutritional-interview-questions';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/custom-nutritional-interview-questions';

  constructor(protected http: HttpClient) {}

  create(customNutritionalInterviewQuestion: ICustomNutritionalInterviewQuestion): Observable<EntityResponseType> {
    return this.http.post<ICustomNutritionalInterviewQuestion>(this.resourceUrl, customNutritionalInterviewQuestion, {
      observe: 'response'
    });
  }

  update(customNutritionalInterviewQuestion: ICustomNutritionalInterviewQuestion): Observable<EntityResponseType> {
    return this.http.put<ICustomNutritionalInterviewQuestion>(this.resourceUrl, customNutritionalInterviewQuestion, {
      observe: 'response'
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomNutritionalInterviewQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomNutritionalInterviewQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomNutritionalInterviewQuestion[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
