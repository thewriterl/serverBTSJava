import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Director } from './director.model';
import { DirectorService } from './director.service';

@Component({
    selector: 'jhi-director-detail',
    templateUrl: './director-detail.component.html'
})
export class DirectorDetailComponent implements OnInit, OnDestroy {

    director: Director;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private directorService: DirectorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDirectors();
    }

    load(id) {
        this.directorService.find(id)
            .subscribe((directorResponse: HttpResponse<Director>) => {
                this.director = directorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDirectors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'directorListModification',
            (response) => this.load(this.director.id)
        );
    }
}
