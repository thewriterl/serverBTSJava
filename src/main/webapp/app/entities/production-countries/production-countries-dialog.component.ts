import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductionCountries } from './production-countries.model';
import { ProductionCountriesPopupService } from './production-countries-popup.service';
import { ProductionCountriesService } from './production-countries.service';

@Component({
    selector: 'jhi-production-countries-dialog',
    templateUrl: './production-countries-dialog.component.html'
})
export class ProductionCountriesDialogComponent implements OnInit {

    productionCountries: ProductionCountries;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private productionCountriesService: ProductionCountriesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productionCountries.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productionCountriesService.update(this.productionCountries));
        } else {
            this.subscribeToSaveResponse(
                this.productionCountriesService.create(this.productionCountries));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductionCountries>>) {
        result.subscribe((res: HttpResponse<ProductionCountries>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductionCountries) {
        this.eventManager.broadcast({ name: 'productionCountriesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-production-countries-popup',
    template: ''
})
export class ProductionCountriesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productionCountriesPopupService: ProductionCountriesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productionCountriesPopupService
                    .open(ProductionCountriesDialogComponent as Component, params['id']);
            } else {
                this.productionCountriesPopupService
                    .open(ProductionCountriesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
