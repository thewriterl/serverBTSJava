import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ProductionCompany } from './production-company.model';
import { ProductionCompanyService } from './production-company.service';

@Component({
    selector: 'jhi-production-company-detail',
    templateUrl: './production-company-detail.component.html'
})
export class ProductionCompanyDetailComponent implements OnInit, OnDestroy {

    productionCompany: ProductionCompany;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private productionCompanyService: ProductionCompanyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductionCompanies();
    }

    load(id) {
        this.productionCompanyService.find(id)
            .subscribe((productionCompanyResponse: HttpResponse<ProductionCompany>) => {
                this.productionCompany = productionCompanyResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductionCompanies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productionCompanyListModification',
            (response) => this.load(this.productionCompany.id)
        );
    }
}
