import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SpokenLanguages } from './spoken-languages.model';
import { SpokenLanguagesPopupService } from './spoken-languages-popup.service';
import { SpokenLanguagesService } from './spoken-languages.service';

@Component({
    selector: 'jhi-spoken-languages-dialog',
    templateUrl: './spoken-languages-dialog.component.html'
})
export class SpokenLanguagesDialogComponent implements OnInit {

    spokenLanguages: SpokenLanguages;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private spokenLanguagesService: SpokenLanguagesService,
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
        if (this.spokenLanguages.id !== undefined) {
            this.subscribeToSaveResponse(
                this.spokenLanguagesService.update(this.spokenLanguages));
        } else {
            this.subscribeToSaveResponse(
                this.spokenLanguagesService.create(this.spokenLanguages));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SpokenLanguages>>) {
        result.subscribe((res: HttpResponse<SpokenLanguages>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SpokenLanguages) {
        this.eventManager.broadcast({ name: 'spokenLanguagesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-spoken-languages-popup',
    template: ''
})
export class SpokenLanguagesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private spokenLanguagesPopupService: SpokenLanguagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.spokenLanguagesPopupService
                    .open(SpokenLanguagesDialogComponent as Component, params['id']);
            } else {
                this.spokenLanguagesPopupService
                    .open(SpokenLanguagesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
