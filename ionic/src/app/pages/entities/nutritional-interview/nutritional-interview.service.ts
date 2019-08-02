import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { NutritionalInterview } from './nutritional-interview.model';

@Injectable({ providedIn: 'root'})
export class NutritionalInterviewService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/nutritional-interviews';

    constructor(protected http: HttpClient) { }

    create(nutritionalInterview: NutritionalInterview): Observable<HttpResponse<NutritionalInterview>> {
        return this.http.post<NutritionalInterview>(this.resourceUrl, nutritionalInterview, { observe: 'response'});
    }

    update(nutritionalInterview: NutritionalInterview): Observable<HttpResponse<NutritionalInterview>> {
        return this.http.put(this.resourceUrl, nutritionalInterview, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<NutritionalInterview>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<NutritionalInterview[]>> {
        const options = createRequestOption(req);
        return this.http.get<NutritionalInterview[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
