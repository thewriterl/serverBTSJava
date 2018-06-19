import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProductionCompany } from './production-company.model';
import { ProductionCompanyService } from './production-company.service';

@Injectable()
export class ProductionCompanyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productionCompanyService: ProductionCompanyService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productionCompanyService.find(id)
                    .subscribe((productionCompanyResponse: HttpResponse<ProductionCompany>) => {
                        const productionCompany: ProductionCompany = productionCompanyResponse.body;
                        this.ngbModalRef = this.productionCompanyModalRef(component, productionCompany);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productionCompanyModalRef(component, new ProductionCompany());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productionCompanyModalRef(component: Component, productionCompany: ProductionCompany): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productionCompany = productionCompany;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
