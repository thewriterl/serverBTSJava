import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Films } from './films.model';
import { FilmsPopupService } from './films-popup.service';
import { FilmsService } from './films.service';

@Component({
    selector: 'jhi-films-delete-dialog',
    templateUrl: './films-delete-dialog.component.html'
})
export class FilmsDeleteDialogComponent {

    films: Films;

    constructor(
        private filmsService: FilmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filmsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'filmsListModification',
                content: 'Deleted an films'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-films-delete-popup',
    template: ''
})
export class FilmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filmsPopupService: FilmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.filmsPopupService
                .open(FilmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
