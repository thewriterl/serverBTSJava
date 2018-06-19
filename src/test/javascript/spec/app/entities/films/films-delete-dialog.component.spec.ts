/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyAppTestModule } from '../../../test.module';
import { FilmsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/films/films-delete-dialog.component';
import { FilmsService } from '../../../../../../main/webapp/app/entities/films/films.service';

describe('Component Tests', () => {

    describe('Films Management Delete Component', () => {
        let comp: FilmsDeleteDialogComponent;
        let fixture: ComponentFixture<FilmsDeleteDialogComponent>;
        let service: FilmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FilmsDeleteDialogComponent],
                providers: [
                    FilmsService
                ]
            })
            .overrideTemplate(FilmsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilmsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
