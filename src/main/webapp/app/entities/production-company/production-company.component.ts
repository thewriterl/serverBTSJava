import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ProductionCompany } from './production-company.model';
import { ProductionCompanyService } from './production-company.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-production-company',
    templateUrl: './production-company.component.html'
})
export class ProductionCompanyComponent implements OnInit, OnDestroy {
productionCompanies: ProductionCompany[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productionCompanyService: ProductionCompanyService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productionCompanyService.query().subscribe(
            (res: HttpResponse<ProductionCompany[]>) => {
                this.productionCompanies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductionCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductionCompany) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInProductionCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('productionCompanyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
