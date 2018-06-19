import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Actors } from './actors.model';
import { ActorsService } from './actors.service';

@Component({
    selector: 'jhi-actors-detail',
    templateUrl: './actors-detail.component.html'
})
export class ActorsDetailComponent implements OnInit, OnDestroy {

    actors: Actors;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private actorsService: ActorsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActors();
    }

    load(id) {
        this.actorsService.find(id)
            .subscribe((actorsResponse: HttpResponse<Actors>) => {
                this.actors = actorsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'actorsListModification',
            (response) => this.load(this.actors.id)
        );
    }
}
