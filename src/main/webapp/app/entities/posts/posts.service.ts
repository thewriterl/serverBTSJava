import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Posts } from './posts.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Posts>;

@Injectable()
export class PostsService {

    private resourceUrl =  SERVER_API_URL + 'api/posts';

    constructor(private http: HttpClient) { }

    create(posts: Posts): Observable<EntityResponseType> {
        const copy = this.convert(posts);
        return this.http.post<Posts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(posts: Posts): Observable<EntityResponseType> {
        const copy = this.convert(posts);
        return this.http.put<Posts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Posts>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Posts[]>> {
        const options = createRequestOption(req);
        return this.http.get<Posts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Posts[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Posts = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Posts[]>): HttpResponse<Posts[]> {
        const jsonResponse: Posts[] = res.body;
        const body: Posts[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Posts.
     */
    private convertItemFromServer(posts: Posts): Posts {
        const copy: Posts = Object.assign({}, posts);
        return copy;
    }

    /**
     * Convert a Posts to a JSON which can be sent to the server.
     */
    private convert(posts: Posts): Posts {
        const copy: Posts = Object.assign({}, posts);
        return copy;
    }
}
