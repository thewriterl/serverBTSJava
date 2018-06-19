import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SpokenLanguages } from './spoken-languages.model';
import { SpokenLanguagesPopupService } from './spoken-languages-popup.service';
import { SpokenLanguagesService } from './spoken-languages.service';

@Component({
    selector: 'jhi-spoken-languages-delete-dialog',
    templateUrl: './spoken-languages-delete-dialog.component.html'
})
export class SpokenLanguagesDeleteDialogComponent {

    spokenLanguages: SpokenLanguages;

    constructor(
        private spokenLanguagesService: SpokenLanguagesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.spokenLanguagesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'spokenLanguagesListModification',
                content: 'Deleted an spokenLanguages'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spoken-languages-delete-popup',
    template: ''
})
export class SpokenLanguagesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private spokenLanguagesPopupService: SpokenLanguagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.spokenLanguagesPopupService
                .open(SpokenLanguagesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
