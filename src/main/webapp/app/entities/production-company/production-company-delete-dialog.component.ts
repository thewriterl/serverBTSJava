import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductionCompany } from './production-company.model';
import { ProductionCompanyPopupService } from './production-company-popup.service';
import { ProductionCompanyService } from './production-company.service';

@Component({
    selector: 'jhi-production-company-delete-dialog',
    templateUrl: './production-company-delete-dialog.component.html'
})
export class ProductionCompanyDeleteDialogComponent {

    productionCompany: ProductionCompany;

    constructor(
        private productionCompanyService: ProductionCompanyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productionCompanyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productionCompanyListModification',
                content: 'Deleted an productionCompany'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-production-company-delete-popup',
    template: ''
})
export class ProductionCompanyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productionCompanyPopupService: ProductionCompanyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productionCompanyPopupService
                .open(ProductionCompanyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
