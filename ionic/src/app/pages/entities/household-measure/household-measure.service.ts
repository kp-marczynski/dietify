import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { HouseholdMeasure } from './household-measure.model';

@Injectable({ providedIn: 'root'})
export class HouseholdMeasureService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/household-measures';

    constructor(protected http: HttpClient) { }

    create(householdMeasure: HouseholdMeasure): Observable<HttpResponse<HouseholdMeasure>> {
        return this.http.post<HouseholdMeasure>(this.resourceUrl, householdMeasure, { observe: 'response'});
    }

    update(householdMeasure: HouseholdMeasure): Observable<HttpResponse<HouseholdMeasure>> {
        return this.http.put(this.resourceUrl, householdMeasure, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<HouseholdMeasure>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<HouseholdMeasure[]>> {
        const options = createRequestOption(req);
        return this.http.get<HouseholdMeasure[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
