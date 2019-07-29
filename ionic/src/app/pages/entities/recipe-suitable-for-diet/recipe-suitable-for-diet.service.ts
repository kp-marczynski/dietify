import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RecipeSuitableForDiet } from './recipe-suitable-for-diet.model';

@Injectable({ providedIn: 'root'})
export class RecipeSuitableForDietService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/recipe-suitable-for-diets';

    constructor(protected http: HttpClient) { }

    create(recipeSuitableForDiet: RecipeSuitableForDiet): Observable<HttpResponse<RecipeSuitableForDiet>> {
        return this.http.post<RecipeSuitableForDiet>(this.resourceUrl, recipeSuitableForDiet, { observe: 'response'});
    }

    update(recipeSuitableForDiet: RecipeSuitableForDiet): Observable<HttpResponse<RecipeSuitableForDiet>> {
        return this.http.put(this.resourceUrl, recipeSuitableForDiet, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RecipeSuitableForDiet>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RecipeSuitableForDiet[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecipeSuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
