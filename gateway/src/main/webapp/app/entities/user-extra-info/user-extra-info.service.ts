import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserExtraInfo } from 'app/shared/model/user-extra-info.model';

type EntityResponseType = HttpResponse<IUserExtraInfo>;
type EntityArrayResponseType = HttpResponse<IUserExtraInfo[]>;

@Injectable({ providedIn: 'root' })
export class UserExtraInfoService {
  public resourceUrl = SERVER_API_URL + 'api/user-extra-infos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/user-extra-infos';

  constructor(protected http: HttpClient) {}

  create(userExtraInfo: IUserExtraInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userExtraInfo);
    return this.http
      .post<IUserExtraInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userExtraInfo: IUserExtraInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userExtraInfo);
    return this.http
      .put<IUserExtraInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserExtraInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserExtraInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserExtraInfo[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(userExtraInfo: IUserExtraInfo): IUserExtraInfo {
    const copy: IUserExtraInfo = Object.assign({}, userExtraInfo, {
      dateOfBirth:
        userExtraInfo.dateOfBirth != null && userExtraInfo.dateOfBirth.isValid() ? userExtraInfo.dateOfBirth.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfBirth = res.body.dateOfBirth != null ? moment(res.body.dateOfBirth) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userExtraInfo: IUserExtraInfo) => {
        userExtraInfo.dateOfBirth = userExtraInfo.dateOfBirth != null ? moment(userExtraInfo.dateOfBirth) : null;
      });
    }
    return res;
  }
}
