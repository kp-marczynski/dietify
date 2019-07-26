import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { DietType } from './diet-type.model';

@Injectable({ providedIn: 'root'})
export class DietTypeService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/diet-types';

    constructor(protected http: HttpClient) { }

    create(dietType: DietType): Observable<HttpResponse<DietType>> {
        return this.http.post<DietType>(this.resourceUrl, dietType, { observe: 'response'});
    }

    update(dietType: DietType): Observable<HttpResponse<DietType>> {
        return this.http.put(this.resourceUrl, dietType, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<DietType>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<DietType[]>> {
        const options = createRequestOption(req);
        return this.http.get<DietType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
