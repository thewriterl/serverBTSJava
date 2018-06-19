import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Director } from './director.model';
import { DirectorPopupService } from './director-popup.service';
import { DirectorService } from './director.service';

@Component({
    selector: 'jhi-director-delete-dialog',
    templateUrl: './director-delete-dialog.component.html'
})
export class DirectorDeleteDialogComponent {

    director: Director;

    constructor(
        private directorService: DirectorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.directorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'directorListModification',
                content: 'Deleted an director'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-director-delete-popup',
    template: ''
})
export class DirectorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private directorPopupService: DirectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.directorPopupService
                .open(DirectorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
