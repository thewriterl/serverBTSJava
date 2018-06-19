import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Films } from './films.model';
import { FilmsService } from './films.service';

@Component({
    selector: 'jhi-films-detail',
    templateUrl: './films-detail.component.html'
})
export class FilmsDetailComponent implements OnInit, OnDestroy {

    films: Films;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private filmsService: FilmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFilms();
    }

    load(id) {
        this.filmsService.find(id)
            .subscribe((filmsResponse: HttpResponse<Films>) => {
                this.films = filmsResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFilms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'filmsListModification',
            (response) => this.load(this.films.id)
        );
    }
}
