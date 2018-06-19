import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SpokenLanguages } from './spoken-languages.model';
import { SpokenLanguagesService } from './spoken-languages.service';

@Component({
    selector: 'jhi-spoken-languages-detail',
    templateUrl: './spoken-languages-detail.component.html'
})
export class SpokenLanguagesDetailComponent implements OnInit, OnDestroy {

    spokenLanguages: SpokenLanguages;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private spokenLanguagesService: SpokenLanguagesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSpokenLanguages();
    }

    load(id) {
        this.spokenLanguagesService.find(id)
            .subscribe((spokenLanguagesResponse: HttpResponse<SpokenLanguages>) => {
                this.spokenLanguages = spokenLanguagesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSpokenLanguages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'spokenLanguagesListModification',
            (response) => this.load(this.spokenLanguages.id)
        );
    }
}
