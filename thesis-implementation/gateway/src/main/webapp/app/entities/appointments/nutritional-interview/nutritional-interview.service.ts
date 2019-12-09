import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

type EntityResponseType = HttpResponse<INutritionalInterview>;
type EntityArrayResponseType = HttpResponse<INutritionalInterview[]>;

@Injectable({ providedIn: 'root' })
export class NutritionalInterviewService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/nutritional-interviews';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/nutritional-interviews';

  constructor(protected http: HttpClient) {}

  create(nutritionalInterview: INutritionalInterview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nutritionalInterview);
    return this.http
      .post<INutritionalInterview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(nutritionalInterview: INutritionalInterview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nutritionalInterview);
    return this.http
      .put<INutritionalInterview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INutritionalInterview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INutritionalInterview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INutritionalInterview[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(nutritionalInterview: INutritionalInterview): INutritionalInterview {
    const copy: INutritionalInterview = Object.assign({}, nutritionalInterview, {
      completionDate:
        nutritionalInterview.completionDate != null && nutritionalInterview.completionDate.isValid()
          ? nutritionalInterview.completionDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.completionDate = res.body.completionDate != null ? moment(res.body.completionDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((nutritionalInterview: INutritionalInterview) => {
        nutritionalInterview.completionDate =
          nutritionalInterview.completionDate != null ? moment(nutritionalInterview.completionDate) : null;
      });
    }
    return res;
  }
}
