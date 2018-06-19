/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyAppTestModule } from '../../../test.module';
import { SpokenLanguagesDialogComponent } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages-dialog.component';
import { SpokenLanguagesService } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.service';
import { SpokenLanguages } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.model';

describe('Component Tests', () => {

    describe('SpokenLanguages Management Dialog Component', () => {
        let comp: SpokenLanguagesDialogComponent;
        let fixture: ComponentFixture<SpokenLanguagesDialogComponent>;
        let service: SpokenLanguagesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [SpokenLanguagesDialogComponent],
                providers: [
                    SpokenLanguagesService
                ]
            })
            .overrideTemplate(SpokenLanguagesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpokenLanguagesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpokenLanguagesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SpokenLanguages(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.spokenLanguages = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'spokenLanguagesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SpokenLanguages();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.spokenLanguages = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'spokenLanguagesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
