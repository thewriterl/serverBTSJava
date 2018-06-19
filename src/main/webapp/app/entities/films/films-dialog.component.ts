import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Films } from './films.model';
import { FilmsPopupService } from './films-popup.service';
import { FilmsService } from './films.service';
import { Director, DirectorService } from '../director';
import { Genres, GenresService } from '../genres';
import { ProductionCountries, ProductionCountriesService } from '../production-countries';
import { SpokenLanguages, SpokenLanguagesService } from '../spoken-languages';
import { Posts, PostsService } from '../posts';
import { Actors, ActorsService } from '../actors';
import { ProductionCompany, ProductionCompanyService } from '../production-company';

@Component({
    selector: 'jhi-films-dialog',
    templateUrl: './films-dialog.component.html'
})
export class FilmsDialogComponent implements OnInit {

    films: Films;
    isSaving: boolean;

    directors: Director[];

    genres: Genres[];

    productioncountries: ProductionCountries[];

    spokenlanguages: SpokenLanguages[];

    posts: Posts[];

    actors: Actors[];

    productioncompanies: ProductionCompany[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private filmsService: FilmsService,
        private directorService: DirectorService,
        private genresService: GenresService,
        private productionCountriesService: ProductionCountriesService,
        private spokenLanguagesService: SpokenLanguagesService,
        private postsService: PostsService,
        private actorsService: ActorsService,
        private productionCompanyService: ProductionCompanyService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.directorService.query()
            .subscribe((res: HttpResponse<Director[]>) => { this.directors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.genresService.query()
            .subscribe((res: HttpResponse<Genres[]>) => { this.genres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productionCountriesService.query()
            .subscribe((res: HttpResponse<ProductionCountries[]>) => { this.productioncountries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.spokenLanguagesService.query()
            .subscribe((res: HttpResponse<SpokenLanguages[]>) => { this.spokenlanguages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.postsService.query()
            .subscribe((res: HttpResponse<Posts[]>) => { this.posts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.actorsService.query()
            .subscribe((res: HttpResponse<Actors[]>) => { this.actors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productionCompanyService.query()
            .subscribe((res: HttpResponse<ProductionCompany[]>) => { this.productioncompanies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.films, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.films.id !== undefined) {
            this.subscribeToSaveResponse(
                this.filmsService.update(this.films));
        } else {
            this.subscribeToSaveResponse(
                this.filmsService.create(this.films));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Films>>) {
        result.subscribe((res: HttpResponse<Films>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Films) {
        this.eventManager.broadcast({ name: 'filmsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDirectorById(index: number, item: Director) {
        return item.id;
    }

    trackGenresById(index: number, item: Genres) {
        return item.id;
    }

    trackProductionCountriesById(index: number, item: ProductionCountries) {
        return item.id;
    }

    trackSpokenLanguagesById(index: number, item: SpokenLanguages) {
        return item.id;
    }

    trackPostsById(index: number, item: Posts) {
        return item.id;
    }

    trackActorsById(index: number, item: Actors) {
        return item.id;
    }

    trackProductionCompanyById(index: number, item: ProductionCompany) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-films-popup',
    template: ''
})
export class FilmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filmsPopupService: FilmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.filmsPopupService
                    .open(FilmsDialogComponent as Component, params['id']);
            } else {
                this.filmsPopupService
                    .open(FilmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
