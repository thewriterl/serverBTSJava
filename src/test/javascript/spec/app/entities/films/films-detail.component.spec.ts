/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { FilmsDetailComponent } from '../../../../../../main/webapp/app/entities/films/films-detail.component';
import { FilmsService } from '../../../../../../main/webapp/app/entities/films/films.service';
import { Films } from '../../../../../../main/webapp/app/entities/films/films.model';

describe('Component Tests', () => {

    describe('Films Management Detail Component', () => {
        let comp: FilmsDetailComponent;
        let fixture: ComponentFixture<FilmsDetailComponent>;
        let service: FilmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FilmsDetailComponent],
                providers: [
                    FilmsService
                ]
            })
            .overrideTemplate(FilmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Films(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.films).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
