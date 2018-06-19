import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Director } from './director.model';
import { DirectorPopupService } from './director-popup.service';
import { DirectorService } from './director.service';

@Component({
    selector: 'jhi-director-dialog',
    templateUrl: './director-dialog.component.html'
})
export class DirectorDialogComponent implements OnInit {

    director: Director;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private directorService: DirectorService,
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
        if (this.director.id !== undefined) {
            this.subscribeToSaveResponse(
                this.directorService.update(this.director));
        } else {
            this.subscribeToSaveResponse(
                this.directorService.create(this.director));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Director>>) {
        result.subscribe((res: HttpResponse<Director>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Director) {
        this.eventManager.broadcast({ name: 'directorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-director-popup',
    template: ''
})
export class DirectorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private directorPopupService: DirectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.directorPopupService
                    .open(DirectorDialogComponent as Component, params['id']);
            } else {
                this.directorPopupService
                    .open(DirectorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
