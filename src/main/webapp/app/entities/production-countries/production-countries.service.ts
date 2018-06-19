import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductionCountries } from './production-countries.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductionCountries>;

@Injectable()
export class ProductionCountriesService {

    private resourceUrl =  SERVER_API_URL + 'api/production-countries';

    constructor(private http: HttpClient) { }

    create(productionCountries: ProductionCountries): Observable<EntityResponseType> {
        const copy = this.convert(productionCountries);
        return this.http.post<ProductionCountries>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productionCountries: ProductionCountries): Observable<EntityResponseType> {
        const copy = this.convert(productionCountries);
        return this.http.put<ProductionCountries>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductionCountries>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductionCountries[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductionCountries[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductionCountries[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductionCountries = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductionCountries[]>): HttpResponse<ProductionCountries[]> {
        const jsonResponse: ProductionCountries[] = res.body;
        const body: ProductionCountries[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductionCountries.
     */
    private convertItemFromServer(productionCountries: ProductionCountries): ProductionCountries {
        const copy: ProductionCountries = Object.assign({}, productionCountries);
        return copy;
    }

    /**
     * Convert a ProductionCountries to a JSON which can be sent to the server.
     */
    private convert(productionCountries: ProductionCountries): ProductionCountries {
        const copy: ProductionCountries = Object.assign({}, productionCountries);
        return copy;
    }
}
