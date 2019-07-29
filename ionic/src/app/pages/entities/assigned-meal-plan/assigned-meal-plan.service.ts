import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { AssignedMealPlan } from './assigned-meal-plan.model';

@Injectable({ providedIn: 'root'})
export class AssignedMealPlanService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/assigned-meal-plans';

    constructor(protected http: HttpClient) { }

    create(assignedMealPlan: AssignedMealPlan): Observable<HttpResponse<AssignedMealPlan>> {
        return this.http.post<AssignedMealPlan>(this.resourceUrl, assignedMealPlan, { observe: 'response'});
    }

    update(assignedMealPlan: AssignedMealPlan): Observable<HttpResponse<AssignedMealPlan>> {
        return this.http.put(this.resourceUrl, assignedMealPlan, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<AssignedMealPlan>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<AssignedMealPlan[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssignedMealPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
