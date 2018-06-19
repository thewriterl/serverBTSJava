import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Genres } from './genres.model';
import { GenresPopupService } from './genres-popup.service';
import { GenresService } from './genres.service';

@Component({
    selector: 'jhi-genres-dialog',
    templateUrl: './genres-dialog.component.html'
})
export class GenresDialogComponent implements OnInit {

    genres: Genres;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private genresService: GenresService,
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
        if (this.genres.id !== undefined) {
            this.subscribeToSaveResponse(
                this.genresService.update(this.genres));
        } else {
            this.subscribeToSaveResponse(
                this.genresService.create(this.genres));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Genres>>) {
        result.subscribe((res: HttpResponse<Genres>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Genres) {
        this.eventManager.broadcast({ name: 'genresListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-genres-popup',
    template: ''
})
export class GenresPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private genresPopupService: GenresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.genresPopupService
                    .open(GenresDialogComponent as Component, params['id']);
            } else {
                this.genresPopupService
                    .open(GenresDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
