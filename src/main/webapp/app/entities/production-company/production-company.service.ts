import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductionCompany } from './production-company.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductionCompany>;

@Injectable()
export class ProductionCompanyService {

    private resourceUrl =  SERVER_API_URL + 'api/production-companies';

    constructor(private http: HttpClient) { }

    create(productionCompany: ProductionCompany): Observable<EntityResponseType> {
        const copy = this.convert(productionCompany);
        return this.http.post<ProductionCompany>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productionCompany: ProductionCompany): Observable<EntityResponseType> {
        const copy = this.convert(productionCompany);
        return this.http.put<ProductionCompany>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductionCompany>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductionCompany[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductionCompany[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductionCompany[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductionCompany = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductionCompany[]>): HttpResponse<ProductionCompany[]> {
        const jsonResponse: ProductionCompany[] = res.body;
        const body: ProductionCompany[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductionCompany.
     */
    private convertItemFromServer(productionCompany: ProductionCompany): ProductionCompany {
        const copy: ProductionCompany = Object.assign({}, productionCompany);
        return copy;
    }

    /**
     * Convert a ProductionCompany to a JSON which can be sent to the server.
     */
    private convert(productionCompany: ProductionCompany): ProductionCompany {
        const copy: ProductionCompany = Object.assign({}, productionCompany);
        return copy;
    }
}
