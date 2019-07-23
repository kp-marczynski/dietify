import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';

type EntityResponseType = HttpResponse<IBodyMeasurment>;
type EntityArrayResponseType = HttpResponse<IBodyMeasurment[]>;

@Injectable({ providedIn: 'root' })
export class BodyMeasurmentService {
    public resourceUrl = SERVER_API_URL + 'api/body-measurments';

    constructor(protected http: HttpClient) {}

    create(bodyMeasurment: IBodyMeasurment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bodyMeasurment);
        return this.http
            .post<IBodyMeasurment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(bodyMeasurment: IBodyMeasurment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bodyMeasurment);
        return this.http
            .put<IBodyMeasurment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBodyMeasurment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBodyMeasurment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(bodyMeasurment: IBodyMeasurment): IBodyMeasurment {
        const copy: IBodyMeasurment = Object.assign({}, bodyMeasurment, {
            completionDate:
                bodyMeasurment.completionDate != null && bodyMeasurment.completionDate.isValid()
                    ? bodyMeasurment.completionDate.format(DATE_FORMAT)
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
            res.body.forEach((bodyMeasurment: IBodyMeasurment) => {
                bodyMeasurment.completionDate = bodyMeasurment.completionDate != null ? moment(bodyMeasurment.completionDate) : null;
            });
        }
        return res;
    }
}
