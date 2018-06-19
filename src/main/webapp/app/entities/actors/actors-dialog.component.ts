import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Actors } from './actors.model';
import { ActorsPopupService } from './actors-popup.service';
import { ActorsService } from './actors.service';

@Component({
    selector: 'jhi-actors-dialog',
    templateUrl: './actors-dialog.component.html'
})
export class ActorsDialogComponent implements OnInit {

    actors: Actors;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private actorsService: ActorsService,
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
        if (this.actors.id !== undefined) {
            this.subscribeToSaveResponse(
                this.actorsService.update(this.actors));
        } else {
            this.subscribeToSaveResponse(
                this.actorsService.create(this.actors));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Actors>>) {
        result.subscribe((res: HttpResponse<Actors>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Actors) {
        this.eventManager.broadcast({ name: 'actorsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-actors-popup',
    template: ''
})
export class ActorsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actorsPopupService: ActorsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.actorsPopupService
                    .open(ActorsDialogComponent as Component, params['id']);
            } else {
                this.actorsPopupService
                    .open(ActorsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
