import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Genres } from './genres.model';
import { GenresPopupService } from './genres-popup.service';
import { GenresService } from './genres.service';

@Component({
    selector: 'jhi-genres-delete-dialog',
    templateUrl: './genres-delete-dialog.component.html'
})
export class GenresDeleteDialogComponent {

    genres: Genres;

    constructor(
        private genresService: GenresService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.genresService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'genresListModification',
                content: 'Deleted an genres'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-genres-delete-popup',
    template: ''
})
export class GenresDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private genresPopupService: GenresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.genresPopupService
                .open(GenresDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
