import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProductionCountries } from './production-countries.model';
import { ProductionCountriesService } from './production-countries.service';

@Injectable()
export class ProductionCountriesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productionCountriesService: ProductionCountriesService

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
                this.productionCountriesService.find(id)
                    .subscribe((productionCountriesResponse: HttpResponse<ProductionCountries>) => {
                        const productionCountries: ProductionCountries = productionCountriesResponse.body;
                        this.ngbModalRef = this.productionCountriesModalRef(component, productionCountries);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productionCountriesModalRef(component, new ProductionCountries());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productionCountriesModalRef(component: Component, productionCountries: ProductionCountries): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productionCountries = productionCountries;
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
