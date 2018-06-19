import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Director } from './director.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Director>;

@Injectable()
export class DirectorService {

    private resourceUrl =  SERVER_API_URL + 'api/directors';

    constructor(private http: HttpClient) { }

    create(director: Director): Observable<EntityResponseType> {
        const copy = this.convert(director);
        return this.http.post<Director>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(director: Director): Observable<EntityResponseType> {
        const copy = this.convert(director);
        return this.http.put<Director>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Director>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Director[]>> {
        const options = createRequestOption(req);
        return this.http.get<Director[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Director[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Director = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Director[]>): HttpResponse<Director[]> {
        const jsonResponse: Director[] = res.body;
        const body: Director[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Director.
     */
    private convertItemFromServer(director: Director): Director {
        const copy: Director = Object.assign({}, director);
        return copy;
    }

    /**
     * Convert a Director to a JSON which can be sent to the server.
     */
    private convert(director: Director): Director {
        const copy: Director = Object.assign({}, director);
        return copy;
    }
}
