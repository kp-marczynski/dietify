import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecipeSection } from 'app/shared/model/recipe-section.model';

type EntityResponseType = HttpResponse<IRecipeSection>;
type EntityArrayResponseType = HttpResponse<IRecipeSection[]>;

@Injectable({ providedIn: 'root' })
export class RecipeSectionService {
    public resourceUrl = SERVER_API_URL + 'api/recipe-sections';

    constructor(protected http: HttpClient) {}

    create(recipeSection: IRecipeSection): Observable<EntityResponseType> {
        return this.http.post<IRecipeSection>(this.resourceUrl, recipeSection, { observe: 'response' });
    }

    update(recipeSection: IRecipeSection): Observable<EntityResponseType> {
        return this.http.put<IRecipeSection>(this.resourceUrl, recipeSection, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRecipeSection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRecipeSection[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
