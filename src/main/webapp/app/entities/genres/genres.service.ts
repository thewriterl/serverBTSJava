import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Genres } from './genres.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Genres>;

@Injectable()
export class GenresService {

    private resourceUrl =  SERVER_API_URL + 'api/genres';

    constructor(private http: HttpClient) { }

    create(genres: Genres): Observable<EntityResponseType> {
        const copy = this.convert(genres);
        return this.http.post<Genres>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(genres: Genres): Observable<EntityResponseType> {
        const copy = this.convert(genres);
        return this.http.put<Genres>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Genres>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Genres[]>> {
        const options = createRequestOption(req);
        return this.http.get<Genres[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Genres[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Genres = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Genres[]>): HttpResponse<Genres[]> {
        const jsonResponse: Genres[] = res.body;
        const body: Genres[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Genres.
     */
    private convertItemFromServer(genres: Genres): Genres {
        const copy: Genres = Object.assign({}, genres);
        return copy;
    }

    /**
     * Convert a Genres to a JSON which can be sent to the server.
     */
    private convert(genres: Genres): Genres {
        const copy: Genres = Object.assign({}, genres);
        return copy;
    }
}
