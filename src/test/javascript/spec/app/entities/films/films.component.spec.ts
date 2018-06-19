/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { FilmsComponent } from '../../../../../../main/webapp/app/entities/films/films.component';
import { FilmsService } from '../../../../../../main/webapp/app/entities/films/films.service';
import { Films } from '../../../../../../main/webapp/app/entities/films/films.model';

describe('Component Tests', () => {

    describe('Films Management Component', () => {
        let comp: FilmsComponent;
        let fixture: ComponentFixture<FilmsComponent>;
        let service: FilmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FilmsComponent],
                providers: [
                    FilmsService
                ]
            })
            .overrideTemplate(FilmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Films(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.films[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
