import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Appointment } from './appointment.model';

@Injectable({ providedIn: 'root'})
export class AppointmentService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/appointments';

    constructor(protected http: HttpClient) { }

    create(appointment: Appointment): Observable<HttpResponse<Appointment>> {
        return this.http.post<Appointment>(this.resourceUrl, appointment, { observe: 'response'});
    }

    update(appointment: Appointment): Observable<HttpResponse<Appointment>> {
        return this.http.put(this.resourceUrl, appointment, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Appointment>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Appointment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appointment[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
