import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { AppointmentEvaluation } from './appointment-evaluation.model';

@Injectable({ providedIn: 'root'})
export class AppointmentEvaluationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/appointment-evaluations';

    constructor(protected http: HttpClient) { }

    create(appointmentEvaluation: AppointmentEvaluation): Observable<HttpResponse<AppointmentEvaluation>> {
        return this.http.post<AppointmentEvaluation>(this.resourceUrl, appointmentEvaluation, { observe: 'response'});
    }

    update(appointmentEvaluation: AppointmentEvaluation): Observable<HttpResponse<AppointmentEvaluation>> {
        return this.http.put(this.resourceUrl, appointmentEvaluation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<AppointmentEvaluation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<AppointmentEvaluation[]>> {
        const options = createRequestOption(req);
        return this.http.get<AppointmentEvaluation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
