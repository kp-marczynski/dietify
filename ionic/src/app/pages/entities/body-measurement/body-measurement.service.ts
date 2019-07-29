import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { BodyMeasurement } from './body-measurement.model';

@Injectable({ providedIn: 'root'})
export class BodyMeasurementService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/body-measurements';

    constructor(protected http: HttpClient) { }

    create(bodyMeasurement: BodyMeasurement): Observable<HttpResponse<BodyMeasurement>> {
        return this.http.post<BodyMeasurement>(this.resourceUrl, bodyMeasurement, { observe: 'response'});
    }

    update(bodyMeasurement: BodyMeasurement): Observable<HttpResponse<BodyMeasurement>> {
        return this.http.put(this.resourceUrl, bodyMeasurement, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<BodyMeasurement>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<BodyMeasurement[]>> {
        const options = createRequestOption(req);
        return this.http.get<BodyMeasurement[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
