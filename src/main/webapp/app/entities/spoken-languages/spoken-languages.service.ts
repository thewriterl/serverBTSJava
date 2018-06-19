import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SpokenLanguages } from './spoken-languages.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SpokenLanguages>;

@Injectable()
export class SpokenLanguagesService {

    private resourceUrl =  SERVER_API_URL + 'api/spoken-languages';

    constructor(private http: HttpClient) { }

    create(spokenLanguages: SpokenLanguages): Observable<EntityResponseType> {
        const copy = this.convert(spokenLanguages);
        return this.http.post<SpokenLanguages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(spokenLanguages: SpokenLanguages): Observable<EntityResponseType> {
        const copy = this.convert(spokenLanguages);
        return this.http.put<SpokenLanguages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SpokenLanguages>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SpokenLanguages[]>> {
        const options = createRequestOption(req);
        return this.http.get<SpokenLanguages[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SpokenLanguages[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SpokenLanguages = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SpokenLanguages[]>): HttpResponse<SpokenLanguages[]> {
        const jsonResponse: SpokenLanguages[] = res.body;
        const body: SpokenLanguages[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SpokenLanguages.
     */
    private convertItemFromServer(spokenLanguages: SpokenLanguages): SpokenLanguages {
        const copy: SpokenLanguages = Object.assign({}, spokenLanguages);
        return copy;
    }

    /**
     * Convert a SpokenLanguages to a JSON which can be sent to the server.
     */
    private convert(spokenLanguages: SpokenLanguages): SpokenLanguages {
        const copy: SpokenLanguages = Object.assign({}, spokenLanguages);
        return copy;
    }
}
