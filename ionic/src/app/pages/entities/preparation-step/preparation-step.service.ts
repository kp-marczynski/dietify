import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { PreparationStep } from './preparation-step.model';

@Injectable({ providedIn: 'root'})
export class PreparationStepService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/preparation-steps';

    constructor(protected http: HttpClient) { }

    create(preparationStep: PreparationStep): Observable<HttpResponse<PreparationStep>> {
        return this.http.post<PreparationStep>(this.resourceUrl, preparationStep, { observe: 'response'});
    }

    update(preparationStep: PreparationStep): Observable<HttpResponse<PreparationStep>> {
        return this.http.put(this.resourceUrl, preparationStep, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<PreparationStep>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<PreparationStep[]>> {
        const options = createRequestOption(req);
        return this.http.get<PreparationStep[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
