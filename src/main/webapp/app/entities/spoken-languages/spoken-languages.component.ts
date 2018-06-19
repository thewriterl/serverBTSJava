import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SpokenLanguages } from './spoken-languages.model';
import { SpokenLanguagesService } from './spoken-languages.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-spoken-languages',
    templateUrl: './spoken-languages.component.html'
})
export class SpokenLanguagesComponent implements OnInit, OnDestroy {
spokenLanguages: SpokenLanguages[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private spokenLanguagesService: SpokenLanguagesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.spokenLanguagesService.query().subscribe(
            (res: HttpResponse<SpokenLanguages[]>) => {
                this.spokenLanguages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSpokenLanguages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SpokenLanguages) {
        return item.id;
    }
    registerChangeInSpokenLanguages() {
        this.eventSubscriber = this.eventManager.subscribe('spokenLanguagesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
