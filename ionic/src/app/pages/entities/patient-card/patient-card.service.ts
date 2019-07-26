import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { PatientCard } from './patient-card.model';

@Injectable({ providedIn: 'root'})
export class PatientCardService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/patient-cards';

    constructor(protected http: HttpClient) { }

    create(patientCard: PatientCard): Observable<HttpResponse<PatientCard>> {
        return this.http.post<PatientCard>(this.resourceUrl, patientCard, { observe: 'response'});
    }

    update(patientCard: PatientCard): Observable<HttpResponse<PatientCard>> {
        return this.http.put(this.resourceUrl, patientCard, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<PatientCard>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<PatientCard[]>> {
        const options = createRequestOption(req);
        return this.http.get<PatientCard[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
