import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';
import { Shoplist } from 'app/shared/model/appointments/shoplist.model';
import { MailableMealPlan } from 'app/shared/model/appointments/mailable-meal-plan.model';

type EntityResponseType = HttpResponse<IAppointment>;
type EntityArrayResponseType = HttpResponse<IAppointment[]>;

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/appointments';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/appointments';

  constructor(protected http: HttpClient) {}

  sendMealPlan(mealPlan: MailableMealPlan) {
    return this.http.post<boolean>(this.resourceUrl + '/send', mealPlan, { observe: 'response' });
  }

  sendShoplist(shoplist: Shoplist) {
    return this.http.post<boolean>(this.resourceUrl + '/send-shoplist', shoplist, { observe: 'response' });
  }

  create(appointment: IAppointment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appointment);
    return this.http
      .post<IAppointment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(appointment: IAppointment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appointment);
    return this.http
      .put<IAppointment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAppointment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(appointment: IAppointment): IAppointment {
    const copy: IAppointment = Object.assign({}, appointment, {
      appointmentDate:
        appointment.appointmentDate != null && appointment.appointmentDate.isValid() ? appointment.appointmentDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.appointmentDate = res.body.appointmentDate != null ? moment(res.body.appointmentDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((appointment: IAppointment) => {
        appointment.appointmentDate = appointment.appointmentDate != null ? moment(appointment.appointmentDate) : null;
      });
    }
    return res;
  }
}
