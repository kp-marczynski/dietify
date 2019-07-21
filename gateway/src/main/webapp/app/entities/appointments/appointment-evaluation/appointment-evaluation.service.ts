import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';

type EntityResponseType = HttpResponse<IAppointmentEvaluation>;
type EntityArrayResponseType = HttpResponse<IAppointmentEvaluation[]>;

@Injectable({ providedIn: 'root' })
export class AppointmentEvaluationService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/appointment-evaluations';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/appointment-evaluations';

  constructor(protected http: HttpClient) {}

  create(appointmentEvaluation: IAppointmentEvaluation): Observable<EntityResponseType> {
    return this.http.post<IAppointmentEvaluation>(this.resourceUrl, appointmentEvaluation, { observe: 'response' });
  }

  update(appointmentEvaluation: IAppointmentEvaluation): Observable<EntityResponseType> {
    return this.http.put<IAppointmentEvaluation>(this.resourceUrl, appointmentEvaluation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppointmentEvaluation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppointmentEvaluation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppointmentEvaluation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
