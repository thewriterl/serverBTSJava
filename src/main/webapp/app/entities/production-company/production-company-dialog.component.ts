import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ProductionCompany } from './production-company.model';
import { ProductionCompanyPopupService } from './production-company-popup.service';
import { ProductionCompanyService } from './production-company.service';

@Component({
    selector: 'jhi-production-company-dialog',
    templateUrl: './production-company-dialog.component.html'
})
export class ProductionCompanyDialogComponent implements OnInit {

    productionCompany: ProductionCompany;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private productionCompanyService: ProductionCompanyService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.productionCompany, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productionCompany.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productionCompanyService.update(this.productionCompany));
        } else {
            this.subscribeToSaveResponse(
                this.productionCompanyService.create(this.productionCompany));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductionCompany>>) {
        result.subscribe((res: HttpResponse<ProductionCompany>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductionCompany) {
        this.eventManager.broadcast({ name: 'productionCompanyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-production-company-popup',
    template: ''
})
export class ProductionCompanyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productionCompanyPopupService: ProductionCompanyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productionCompanyPopupService
                    .open(ProductionCompanyDialogComponent as Component, params['id']);
            } else {
                this.productionCompanyPopupService
                    .open(ProductionCompanyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
