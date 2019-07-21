import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecipe } from 'app/shared/model/recipe.model';

type EntityResponseType = HttpResponse<IRecipe>;
type EntityArrayResponseType = HttpResponse<IRecipe[]>;

@Injectable({ providedIn: 'root' })
export class RecipeService {
    public resourceUrl = SERVER_API_URL + 'api/recipes';

    constructor(protected http: HttpClient) {}

    create(recipe: IRecipe): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(recipe);
        return this.http
            .post<IRecipe>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(recipe: IRecipe): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(recipe);
        return this.http
            .put<IRecipe>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRecipe>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRecipe[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(recipe: IRecipe): IRecipe {
        const copy: IRecipe = Object.assign({}, recipe, {
            creationDate: recipe.creationDate != null && recipe.creationDate.isValid() ? recipe.creationDate.format(DATE_FORMAT) : null,
            lastEditDate: recipe.lastEditDate != null && recipe.lastEditDate.isValid() ? recipe.lastEditDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.lastEditDate = res.body.lastEditDate != null ? moment(res.body.lastEditDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((recipe: IRecipe) => {
                recipe.creationDate = recipe.creationDate != null ? moment(recipe.creationDate) : null;
                recipe.lastEditDate = recipe.lastEditDate != null ? moment(recipe.lastEditDate) : null;
            });
        }
        return res;
    }
}
