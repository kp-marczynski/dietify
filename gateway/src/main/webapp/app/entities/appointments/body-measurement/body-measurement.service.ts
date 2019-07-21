import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

type EntityResponseType = HttpResponse<IBodyMeasurement>;
type EntityArrayResponseType = HttpResponse<IBodyMeasurement[]>;

@Injectable({ providedIn: 'root' })
export class BodyMeasurementService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/body-measurements';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/body-measurements';

  constructor(protected http: HttpClient) {}

  create(bodyMeasurement: IBodyMeasurement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bodyMeasurement);
    return this.http
      .post<IBodyMeasurement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bodyMeasurement: IBodyMeasurement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bodyMeasurement);
    return this.http
      .put<IBodyMeasurement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBodyMeasurement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBodyMeasurement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBodyMeasurement[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(bodyMeasurement: IBodyMeasurement): IBodyMeasurement {
    const copy: IBodyMeasurement = Object.assign({}, bodyMeasurement, {
      completionDate:
        bodyMeasurement.completionDate != null && bodyMeasurement.completionDate.isValid()
          ? bodyMeasurement.completionDate.format(DATE_FORMAT)
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
      res.body.forEach((bodyMeasurement: IBodyMeasurement) => {
        bodyMeasurement.completionDate = bodyMeasurement.completionDate != null ? moment(bodyMeasurement.completionDate) : null;
      });
    }
    return res;
  }
}
