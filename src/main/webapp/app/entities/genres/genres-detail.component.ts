import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Genres } from './genres.model';
import { GenresService } from './genres.service';

@Component({
    selector: 'jhi-genres-detail',
    templateUrl: './genres-detail.component.html'
})
export class GenresDetailComponent implements OnInit, OnDestroy {

    genres: Genres;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private genresService: GenresService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGenres();
    }

    load(id) {
        this.genresService.find(id)
            .subscribe((genresResponse: HttpResponse<Genres>) => {
                this.genres = genresResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGenres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'genresListModification',
            (response) => this.load(this.genres.id)
        );
    }
}
