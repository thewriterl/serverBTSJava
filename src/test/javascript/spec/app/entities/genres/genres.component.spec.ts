/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { GenresComponent } from '../../../../../../main/webapp/app/entities/genres/genres.component';
import { GenresService } from '../../../../../../main/webapp/app/entities/genres/genres.service';
import { Genres } from '../../../../../../main/webapp/app/entities/genres/genres.model';

describe('Component Tests', () => {

    describe('Genres Management Component', () => {
        let comp: GenresComponent;
        let fixture: ComponentFixture<GenresComponent>;
        let service: GenresService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [GenresComponent],
                providers: [
                    GenresService
                ]
            })
            .overrideTemplate(GenresComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenresComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenresService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Genres(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.genres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
