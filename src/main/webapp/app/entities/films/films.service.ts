import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Films } from './films.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Films>;

@Injectable()
export class FilmsService {

    private resourceUrl =  SERVER_API_URL + 'api/films';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(films: Films): Observable<EntityResponseType> {
        const copy = this.convert(films);
        return this.http.post<Films>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(films: Films): Observable<EntityResponseType> {
        const copy = this.convert(films);
        return this.http.put<Films>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Films>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Films[]>> {
        const options = createRequestOption(req);
        return this.http.get<Films[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Films[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Films = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Films[]>): HttpResponse<Films[]> {
        const jsonResponse: Films[] = res.body;
        const body: Films[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Films.
     */
    private convertItemFromServer(films: Films): Films {
        const copy: Films = Object.assign({}, films);
        copy.releaseDate = this.dateUtils
            .convertDateTimeFromServer(films.releaseDate);
        return copy;
    }

    /**
     * Convert a Films to a JSON which can be sent to the server.
     */
    private convert(films: Films): Films {
        const copy: Films = Object.assign({}, films);

        copy.releaseDate = this.dateUtils.toDate(films.releaseDate);
        return copy;
    }
}
