import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Actors } from './actors.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Actors>;

@Injectable()
export class ActorsService {

    private resourceUrl =  SERVER_API_URL + 'api/actors';

    constructor(private http: HttpClient) { }

    create(actors: Actors): Observable<EntityResponseType> {
        const copy = this.convert(actors);
        return this.http.post<Actors>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(actors: Actors): Observable<EntityResponseType> {
        const copy = this.convert(actors);
        return this.http.put<Actors>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Actors>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Actors[]>> {
        const options = createRequestOption(req);
        return this.http.get<Actors[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Actors[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Actors = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Actors[]>): HttpResponse<Actors[]> {
        const jsonResponse: Actors[] = res.body;
        const body: Actors[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Actors.
     */
    private convertItemFromServer(actors: Actors): Actors {
        const copy: Actors = Object.assign({}, actors);
        return copy;
    }

    /**
     * Convert a Actors to a JSON which can be sent to the server.
     */
    private convert(actors: Actors): Actors {
        const copy: Actors = Object.assign({}, actors);
        return copy;
    }
}
