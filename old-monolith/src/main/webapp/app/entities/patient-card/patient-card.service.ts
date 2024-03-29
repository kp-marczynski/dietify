import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPatientCard } from 'app/shared/model/patient-card.model';

type EntityResponseType = HttpResponse<IPatientCard>;
type EntityArrayResponseType = HttpResponse<IPatientCard[]>;

@Injectable({ providedIn: 'root' })
export class PatientCardService {
    public resourceUrl = SERVER_API_URL + 'api/patient-cards';

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

    protected convertDateFromClient(patientCard: IPatientCard): IPatientCard {
        const copy: IPatientCard = Object.assign({}, patientCard, {
            creationDate:
                patientCard.creationDate != null && patientCard.creationDate.isValid() ? patientCard.creationDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((patientCard: IPatientCard) => {
                patientCard.creationDate = patientCard.creationDate != null ? moment(patientCard.creationDate) : null;
            });
        }
        return res;
    }
}
