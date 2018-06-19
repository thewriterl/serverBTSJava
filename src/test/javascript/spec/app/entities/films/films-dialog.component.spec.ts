/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyAppTestModule } from '../../../test.module';
import { FilmsDialogComponent } from '../../../../../../main/webapp/app/entities/films/films-dialog.component';
import { FilmsService } from '../../../../../../main/webapp/app/entities/films/films.service';
import { Films } from '../../../../../../main/webapp/app/entities/films/films.model';
import { DirectorService } from '../../../../../../main/webapp/app/entities/director';
import { GenresService } from '../../../../../../main/webapp/app/entities/genres';
import { ProductionCountriesService } from '../../../../../../main/webapp/app/entities/production-countries';
import { SpokenLanguagesService } from '../../../../../../main/webapp/app/entities/spoken-languages';
import { PostsService } from '../../../../../../main/webapp/app/entities/posts';
import { ActorsService } from '../../../../../../main/webapp/app/entities/actors';
import { ProductionCompanyService } from '../../../../../../main/webapp/app/entities/production-company';

describe('Component Tests', () => {

    describe('Films Management Dialog Component', () => {
        let comp: FilmsDialogComponent;
        let fixture: ComponentFixture<FilmsDialogComponent>;
        let service: FilmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FilmsDialogComponent],
                providers: [
                    DirectorService,
                    GenresService,
                    ProductionCountriesService,
                    SpokenLanguagesService,
                    PostsService,
                    ActorsService,
                    ProductionCompanyService,
                    FilmsService
                ]
            })
            .overrideTemplate(FilmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Films(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.films = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'filmsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Films();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.films = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'filmsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
