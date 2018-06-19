import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductionCountries } from './production-countries.model';
import { ProductionCountriesService } from './production-countries.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-production-countries',
    templateUrl: './production-countries.component.html'
})
export class ProductionCountriesComponent implements OnInit, OnDestroy {
productionCountries: ProductionCountries[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productionCountriesService: ProductionCountriesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productionCountriesService.query().subscribe(
            (res: HttpResponse<ProductionCountries[]>) => {
                this.productionCountries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductionCountries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductionCountries) {
        return item.id;
    }
    registerChangeInProductionCountries() {
        this.eventSubscriber = this.eventManager.subscribe('productionCountriesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
