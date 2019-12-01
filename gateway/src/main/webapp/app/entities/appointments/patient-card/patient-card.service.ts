import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPatientCard } from 'app/shared/model/appointments/patient-card.model';

type EntityResponseType = HttpResponse<IPatientCard>;
type EntityArrayResponseType = HttpResponse<IPatientCard[]>;

@Injectable({ providedIn: 'root' })
export class PatientCardService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/patient-cards';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/patient-cards';

  constructor(protected http: HttpClient) {}

  create(patientCard: IPatientCard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientCard);
    return this.http
      .post<IPatientCard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(patientCard: IPatientCard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientCard);
    return this.http
      .put<IPatientCard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPatientCard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPatientCard[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPatientCard[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(patientCard: IPatientCard): IPatientCard {
    const copy: IPatientCard = Object.assign({}, patientCard, {
      creationDate:
        patientCard.creationDate != null && patientCard.creationDate.isValid() ? patientCard.creationDate.format(DATE_FORMAT) : null,
      patientDateOfBirth:
        patientCard.patientDateOfBirth != null && patientCard.patientDateOfBirth.isValid()
          ? patientCard.patientDateOfBirth.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
      res.body.patientDateOfBirth = res.body.patientDateOfBirth != null ? moment(res.body.patientDateOfBirth) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((patientCard: IPatientCard) => {
        patientCard.creationDate = patientCard.creationDate != null ? moment(patientCard.creationDate) : null;
        patientCard.patientDateOfBirth = patientCard.patientDateOfBirth != null ? moment(patientCard.patientDateOfBirth) : null;
      });
    }
    return res;
  }
}
