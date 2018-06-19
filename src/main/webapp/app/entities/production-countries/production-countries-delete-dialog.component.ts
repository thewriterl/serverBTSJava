import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductionCountries } from './production-countries.model';
import { ProductionCountriesPopupService } from './production-countries-popup.service';
import { ProductionCountriesService } from './production-countries.service';

@Component({
    selector: 'jhi-production-countries-delete-dialog',
    templateUrl: './production-countries-delete-dialog.component.html'
})
export class ProductionCountriesDeleteDialogComponent {

    productionCountries: ProductionCountries;

    constructor(
        private productionCountriesService: ProductionCountriesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productionCountriesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productionCountriesListModification',
                content: 'Deleted an productionCountries'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-production-countries-delete-popup',
    template: ''
})
export class ProductionCountriesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productionCountriesPopupService: ProductionCountriesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productionCountriesPopupService
                .open(ProductionCountriesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
