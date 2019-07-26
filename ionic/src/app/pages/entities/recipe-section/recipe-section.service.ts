import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RecipeSection } from './recipe-section.model';

@Injectable({ providedIn: 'root'})
export class RecipeSectionService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/recipe-sections';

    constructor(protected http: HttpClient) { }

    create(recipeSection: RecipeSection): Observable<HttpResponse<RecipeSection>> {
        return this.http.post<RecipeSection>(this.resourceUrl, recipeSection, { observe: 'response'});
    }

    update(recipeSection: RecipeSection): Observable<HttpResponse<RecipeSection>> {
        return this.http.put(this.resourceUrl, recipeSection, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RecipeSection>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RecipeSection[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecipeSection[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
