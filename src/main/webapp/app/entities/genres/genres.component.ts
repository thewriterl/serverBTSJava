import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Genres } from './genres.model';
import { GenresService } from './genres.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-genres',
    templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit, OnDestroy {
genres: Genres[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private genresService: GenresService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.genresService.query().subscribe(
            (res: HttpResponse<Genres[]>) => {
                this.genres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGenres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Genres) {
        return item.id;
    }
    registerChangeInGenres() {
        this.eventSubscriber = this.eventManager.subscribe('genresListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
