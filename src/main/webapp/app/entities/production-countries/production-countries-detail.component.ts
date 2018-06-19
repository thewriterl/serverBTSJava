import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductionCountries } from './production-countries.model';
import { ProductionCountriesService } from './production-countries.service';

@Component({
    selector: 'jhi-production-countries-detail',
    templateUrl: './production-countries-detail.component.html'
})
export class ProductionCountriesDetailComponent implements OnInit, OnDestroy {

    productionCountries: ProductionCountries;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productionCountriesService: ProductionCountriesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductionCountries();
    }

    load(id) {
        this.productionCountriesService.find(id)
            .subscribe((productionCountriesResponse: HttpResponse<ProductionCountries>) => {
                this.productionCountries = productionCountriesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductionCountries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productionCountriesListModification',
            (response) => this.load(this.productionCountries.id)
        );
    }
}
