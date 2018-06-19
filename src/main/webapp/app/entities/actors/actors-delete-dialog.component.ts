import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Actors } from './actors.model';
import { ActorsPopupService } from './actors-popup.service';
import { ActorsService } from './actors.service';

@Component({
    selector: 'jhi-actors-delete-dialog',
    templateUrl: './actors-delete-dialog.component.html'
})
export class ActorsDeleteDialogComponent {

    actors: Actors;

    constructor(
        private actorsService: ActorsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.actorsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'actorsListModification',
                content: 'Deleted an actors'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-actors-delete-popup',
    template: ''
})
export class ActorsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actorsPopupService: ActorsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.actorsPopupService
                .open(ActorsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
