import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { DishTypeTranslation } from './dish-type-translation.model';

@Injectable({ providedIn: 'root'})
export class DishTypeTranslationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/dish-type-translations';

    constructor(protected http: HttpClient) { }

    create(dishTypeTranslation: DishTypeTranslation): Observable<HttpResponse<DishTypeTranslation>> {
        return this.http.post<DishTypeTranslation>(this.resourceUrl, dishTypeTranslation, { observe: 'response'});
    }

    update(dishTypeTranslation: DishTypeTranslation): Observable<HttpResponse<DishTypeTranslation>> {
        return this.http.put(this.resourceUrl, dishTypeTranslation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<DishTypeTranslation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<DishTypeTranslation[]>> {
        const options = createRequestOption(req);
        return this.http.get<DishTypeTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
