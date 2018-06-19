import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Director } from './director.model';
import { DirectorService } from './director.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-director',
    templateUrl: './director.component.html'
})
export class DirectorComponent implements OnInit, OnDestroy {
directors: Director[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private directorService: DirectorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.directorService.query().subscribe(
            (res: HttpResponse<Director[]>) => {
                this.directors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDirectors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Director) {
        return item.id;
    }
    registerChangeInDirectors() {
        this.eventSubscriber = this.eventManager.subscribe('directorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
