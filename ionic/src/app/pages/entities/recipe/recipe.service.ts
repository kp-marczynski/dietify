import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root'})
export class RecipeService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/recipes';

    constructor(protected http: HttpClient) { }

    create(recipe: Recipe): Observable<HttpResponse<Recipe>> {
        return this.http.post<Recipe>(this.resourceUrl, recipe, { observe: 'response'});
    }

    update(recipe: Recipe): Observable<HttpResponse<Recipe>> {
        return this.http.put(this.resourceUrl, recipe, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Recipe>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Recipe[]>> {
        const options = createRequestOption(req);
        return this.http.get<Recipe[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
