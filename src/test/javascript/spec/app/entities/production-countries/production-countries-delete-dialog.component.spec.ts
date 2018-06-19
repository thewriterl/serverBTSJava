/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyAppTestModule } from '../../../test.module';
import { ProductionCountriesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/production-countries/production-countries-delete-dialog.component';
import { ProductionCountriesService } from '../../../../../../main/webapp/app/entities/production-countries/production-countries.service';

describe('Component Tests', () => {

    describe('ProductionCountries Management Delete Component', () => {
        let comp: ProductionCountriesDeleteDialogComponent;
        let fixture: ComponentFixture<ProductionCountriesDeleteDialogComponent>;
        let service: ProductionCountriesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ProductionCountriesDeleteDialogComponent],
                providers: [
                    ProductionCountriesService
                ]
            })
            .overrideTemplate(ProductionCountriesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductionCountriesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionCountriesService);
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
