import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SpokenLanguages } from './spoken-languages.model';
import { SpokenLanguagesService } from './spoken-languages.service';

@Injectable()
export class SpokenLanguagesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private spokenLanguagesService: SpokenLanguagesService

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
                this.spokenLanguagesService.find(id)
                    .subscribe((spokenLanguagesResponse: HttpResponse<SpokenLanguages>) => {
                        const spokenLanguages: SpokenLanguages = spokenLanguagesResponse.body;
                        this.ngbModalRef = this.spokenLanguagesModalRef(component, spokenLanguages);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.spokenLanguagesModalRef(component, new SpokenLanguages());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    spokenLanguagesModalRef(component: Component, spokenLanguages: SpokenLanguages): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.spokenLanguages = spokenLanguages;
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
